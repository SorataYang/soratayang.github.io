import numpy as np
import requests
from pyp3d import *
import pickle
import tempfile


class PostQt:
    @staticmethod
    def post_file(file_path: str, url: str = "http://localhost:55125/pythonForQt/"):
        """
        发送请求实现桥通运行py文件，自动显示运行结果
        :param file_path:
        :param url:
        :return:
        """
        response = requests.post(url, headers={'Content-Type': 'PyFile'}, data=file_path.encode('utf-8'))
        if response.status_code == 200:
            print(response.text)  # 自动打印运行结果
        elif response.status_code == 400:
            raise Exception(response.text)
        else:
            raise Exception("连接错误，请重新尝试")

    @staticmethod
    def post_command(command: str, url: str = "http://localhost:55125/pythonForQt/"):
        """
        发送py命令流（如有多行需要传递换行符和缩进符）,返回py运行后输出窗口内容信息，不显示运行结果
        :param command:
        :param url:
        :return:
        """
        response = requests.post(url, headers={'Content-Type': 'Python'}, data=command.encode('utf-8'))
        if response.status_code == 200:
            return response.text.splitlines()  # 返回py运行后输出窗口内容信息
        elif response.status_code == 400:
            raise Exception(response.text)
        else:
            raise Exception("连接错误，请重新尝试")


class SectionLoop(Component):
    def __init__(self):
        Component.__init__(self)
        self.main_loop_i = []
        self.main_loop_j = []
        self.sub_loops_i = []
        self.sub_loops_j = []
        self.h = 1
        self.bias_i_x = 0
        self.bias_i_y = 0
        self.bias_j_x = 0
        self.bias_j_y = 0
        self['模型'] = Attr(None, show=True)

    def get_begin_loops(self, main_loop_data, *args):
        """
        获取I端截面子线圈，仅针对单一外圈截面
        :param main_loop_data: [[x1,y1],[x2,y2]...]
        :param args: [[x1,y1],[x2,y2]...]
        :return:
        """
        self.main_loop_i = main_loop_data
        self.sub_loops_i = []
        if len(args) > 0:
            for item in args:
                self.sub_loops_i.append(item)

    def get_end_loops(self, main_loop_data, *args):
        """
        获取J端截面子线圈，仅针对单一外圈截面
        :param main_loop_data: [[x1,y1],[x2,y2]...]
        :param args: [[x1,y1],[x2,y2]...]
        :return :
        """
        self.main_loop_j = main_loop_data
        self.sub_loops_j = []
        if len(args) > 0:
            for item in args:
                self.sub_loops_j.append(item)

    def set_center_and_height(self, h, bi_x, bi_y, bj_x, bj_y):
        self.h = h
        self.bias_i_x = bi_x
        self.bias_i_y = bi_y
        self.bias_j_x = bj_x
        self.bias_j_y = bj_y

    @export
    def replace(self):
        """
        将模型绘制在yz平面上，偏心位于坐标原点
        :return:
        """
        # 截面绘制在yz面上
        mainline_begin = Line(*[Vec3(0, item[0], item[1]) for item in self.main_loop_i])
        mainline_end = Line(*[Vec3(0, item[0], item[1]) for item in self.main_loop_j])
        main_section_begin = translate(0, -self.bias_i_x, -self.bias_i_y) * Section(mainline_begin)
        main_section_end = translate(self.h, -self.bias_j_x, -self.bias_j_y) * Section(mainline_end)
        self['模型'] = Loft(main_section_begin, main_section_end)
        for i in range(len(self.sub_loops_i)):
            subline_begin = Line(*[Vec3(0, item[0], item[1]) for item in self.sub_loops_i[i]])
            subline_end = Line(*[Vec3(0, item[0], item[1]) for item in self.sub_loops_j[i]])
            sub_item = Loft(translate(0, -self.bias_i_x, -self.bias_i_y) *
                            Section(subline_begin),
                            translate(self.h, -self.bias_j_x, -self.bias_j_y) *
                            Section(subline_end))
            self['模型'] = self['模型'] - sub_item


class SectionPlate(Component):
    def __int__(self):
        Component.__init__(self)
        self['模型'] = Attr(None, show=True)

    @export
    def replace(self):
        temp_dir = tempfile.gettempdir() + "/my_dict.pkl"
        with open(temp_dir, "rb") as f:
            loaded_dict = pickle.load(f)
            points = loaded_dict['node_list']
            thick = loaded_dict['thick']
            sec_base = Section(Line(*[Vec3(item[0], item[1], item[2]) for item in points]))
            node_i = np.array(points[0])
            node_j = np.array(points[1])
            node_k = np.array(points[2])
            ij = node_j - node_i
            ik = node_k - node_i
            # 计算叉积
            normal_vector = np.cross(ij, ik)
            direct_t = normal_vector * thick / np.linalg.norm(normal_vector)
            self['模型'] = Loft(sec_base, translate(direct_t[0] * 0.5 * thick,
                                        direct_t[1] * 0.5 * thick,
                                        direct_t[2] * 0.5 * thick) * sec_base)
            place_to(self['模型'], trans(0, 0, 0))


class SectionLine(Component):
    def __int__(self):
        Component.__init__(self)
        self['模型'] = Attr(None, show=True)

    def place_line_sec(self, data_list):
        """
        根据线条起始点确定截面
        :param data_list: [x1,y1,x2,y2,thick]
        :return:
        """
        x1 = data_list[0]
        y1 = data_list[1]
        x2 = data_list[2]
        y2 = data_list[3]
        t = data_list[4]
        line_length = sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
        line_direct = np.array([x2 - x1, y2 - y1])
        line_base = np.array([1, 0])
        base_sec = Section(Line(Vec3(0, 0, -0.5 * t), Vec3(0, line_length, -0.5 * t),
                                Vec3(0, line_length, 0.5 * t), Vec3(0, 0, 0.5 * t)))
        if abs(y2 - y1) < 5e-5:
            if x2 > x1:
                return translate(0, x1, y1) * base_sec
            else:
                return translate(0, x2, y2) * base_sec
        else:
            # 计算夹角
            dot_product = np.dot(line_base, line_direct)
            # 计算向量的模
            norm_A = np.linalg.norm(line_base)
            norm_B = np.linalg.norm(line_direct)
            # 计算夹角的余弦值
            cos_theta = dot_product / (norm_A * norm_B)
            # 使用arccos计算夹角
            theta = np.arccos(np.clip(cos_theta, -1.0, 1.0))
            # 计算外积（叉积）
            cross_product = line_base[0] * line_direct[1] - line_base[1] * line_direct[0]
            # 确定夹角的方向
            if cross_product < 0:
                theta = -theta
            return translate(0, x1, y1) * rotx(theta) * base_sec

    @export
    def replace(self):
        temp_dir = tempfile.gettempdir() + "/my_dict.pkl"
        with open(temp_dir, "rb") as f:
            loaded_dict = pickle.load(f)
            lines_i = loaded_dict['list_sec_i']
            lines_j = loaded_dict['list_sec_j']
            bias_i_x = loaded_dict['bias_i_x']
            bias_i_y = loaded_dict['bias_i_y']
            bias_j_x = loaded_dict['bias_j_x']
            bias_j_y = loaded_dict['bias_j_y']
            h = loaded_dict['h']
            self['模型'] = Attr(None, show=True)
            for i in range(len(lines_i)):
                sec_i = translate(0, -bias_i_x, -bias_i_y) * self.place_line_sec(lines_i[i])
                sec_j = translate(h, -bias_j_x, -bias_j_y) * self.place_line_sec(lines_j[i])
                if i == 0:
                    self['模型'] = Loft(sec_i, sec_j)
                else:
                    self['模型'] = self['模型'] + Loft(sec_i, sec_j)


class PlaceHelper:
    @staticmethod
    def place_plate_element(node_i, node_j, node_k, node_l, thickness):
        nodes = [[node_i['x'], node_i['y'], node_i['z']],
                 [node_j['x'], node_j['y'], node_j['z']],
                 [node_k['x'], node_k['y'], node_k['z']],
                 [node_l['x'], node_l['y'], node_l['z']]]
        data_dict = {
            'node_list': nodes,
            'thick': thickness,
        }
        temp_dir = tempfile.gettempdir() + "/my_dict.pkl"
        # 保存字典为pkl文件
        with open(temp_dir, "wb") as f:
            pickle.dump(data_dict, f)
            this_element = SectionPlate()
            this_element.replace()


    @staticmethod
    def place_line_element(node_i, node_j, shape_i, shape_j, bias_i_x, bias_i_y, bias_j_x, bias_j_y, beta_angle):
        list_sec_i = [[item['x1'], item['y1'], item['x2'], item['y2'], item['t']] for item in shape_i]
        print(list_sec_i)
        list_sec_j = [[item['x1'], item['y1'], item['x2'], item['y2'], item['t']] for item in shape_j]
        element_direct = np.array([node_j['x'] - node_i['x'], node_j['y'] - node_i['y'], node_j['z'] - node_i['z']])
        data_dict = {}
        data_dict['list_sec_i'] = list_sec_i
        data_dict['list_sec_j'] = list_sec_j
        data_dict['bias_i_x'] = bias_i_x
        data_dict['bias_i_y'] = bias_i_y
        data_dict['bias_j_x'] = bias_j_x
        data_dict['bias_j_y'] = bias_j_y
        data_dict['h'] = float(np.linalg.norm(element_direct))
        temp_dir = tempfile.gettempdir() + "/my_dict.pkl"
        # 保存字典为pkl文件
        with open(temp_dir, "wb") as f:
            pickle.dump(data_dict, f)
            this_element = SectionLine()
            this_element.replace()
            place_to(this_element, trans(0, bias_i_x, bias_i_y))
            PlaceHelper.place_to(node_i, node_j, this_element, beta_angle)

    @staticmethod
    def place_loop_element(node_i, node_j, shape_i, shape_j, bias_i_x, bias_i_y, bias_j_x, bias_j_y, beta_angle):
        element_direct = np.array([node_j['x'] - node_i['x'], node_j['y'] - node_i['y'], node_j['z'] - node_i['z']])
        element = SectionLoop()
        element.get_begin_loops(shape_i['main_loop'], *shape_i['sub_loops'])
        element.get_end_loops(shape_j['main_loop'], *shape_j['sub_loops'])
        element.set_center_and_height(float(np.linalg.norm(element_direct)), bias_i_x,
                                      bias_i_y, bias_j_x, bias_j_y)
        PlaceHelper.place_to(node_i, node_j, element, beta_angle)

    @staticmethod
    def place_to(point_i, point_j, target_element, beta: float = 0):
        target_element.replace()
        direct_x = np.array([point_j['x'] - point_i['x'], point_j['y'] - point_i['y'], point_j['z'] - point_i['z']])
        direct_x = direct_x / np.linalg.norm(direct_x)
        if abs(abs(direct_x[2]) - 1) < 5e-5:
            direct_z = PlaceHelper.rotate_around_axis(np.array([1, 0, 0]), direct_x, beta)
            direct_y = np.cross(direct_z, direct_x)
            direct_y = direct_y / np.linalg.norm(direct_y)
        else:
            # 整体坐标的z轴与局部坐标x轴叉乘得到局部y轴
            cross_zx = np.cross(np.array([0, 0, 1]), direct_x)
            direct_y = PlaceHelper.rotate_around_axis(cross_zx, direct_x, beta)
            direct_y = direct_y / np.linalg.norm(direct_y)
            # 局部坐标的x轴与y轴叉乘得到局部的z轴
            direct_z = np.cross(direct_x, direct_y)
            direct_z = direct_z / np.linalg.norm(direct_z)
        place_to(target_element,
                 trans(point_i['x'], point_i['y'], point_i['z']) *
                 GeTransform([[direct_x[0], direct_y[0], direct_z[0], 0],
                              [direct_x[1], direct_y[1], direct_z[1], 0],
                              [direct_x[2], direct_y[2], direct_z[2], 0]]))

    @staticmethod
    def rotate_around_axis(vector, axis, angle: float = 0):
        radians = math.radians(angle)
        if abs(radians % (2 * pi)) <= 1e-6:
            return vector
        unit_axis = axis / np.linalg.norm(axis)
        cost = math.cos(radians)
        sint = math.sin(radians)
        return vector * cost + np.cross(unit_axis, vector) * sint + unit_axis * np.dot(unit_axis, vector) * (1 - cost)


if __name__ == "__main__":
    # 导出时需将桥通中变截面组转换为变截面后再运行该程序
    # 获取单元信息
    data = PostQt.post_command(f"print(odb.get_element_data())")[0]
    element_list = [json.loads(item) for item in json.loads(data)]
    # 获取节点信息
    data = PostQt.post_command(f"print(odb.get_node_data())")[0]
    node_list = [json.loads(item) for item in json.loads(data)]
    # 获取截面信息
    data = PostQt.post_command(f"print(odb.get_all_section_shape())")[0]
    shape_list = [json.loads(item) for item in json.loads(data)]
    # 将截面信息按照id排序
    dict_by_index_for_sec = {d['index']: d for d in shape_list}
    # 将节点信息按照id排序
    dict_by_index_for_node = {d['node_id']: d for d in node_list}
    # 批量创建截面
    bim_sec_list = []
    for item in element_list:
        node_i = dict_by_index_for_node[item['node_list'][0]]
        node_j = dict_by_index_for_node[item['node_list'][1]]
        beta_angle = item['beta']
        if item['ele_type'] == "PLATE":
            node_k = dict_by_index_for_node[item['node_list'][2]]
            node_l = dict_by_index_for_node[item['node_list'][3]]
            thick_data = json.loads(PostQt.post_command(f"print(odb.get_thickness_data({item['thick_id']}))")[0])
            thickness = thick_data['t']
            PlaceHelper.place_plate_element(node_i, node_j, node_k, node_l, thickness)
            continue
        sec_type = dict_by_index_for_sec[item['sec_id']]['sec_type']
        if sec_type == "自定义线圈截面":
            shape_i = dict_by_index_for_sec[item['sec_id']]['sec_shape'][0]
            shape_j = dict_by_index_for_sec[item['sec_id']]['sec_shape'][0]
            bias_x = dict_by_index_for_sec[item['sec_id']]['sec_bias'][0]
            bias_y = dict_by_index_for_sec[item['sec_id']]['sec_bias'][1]
            PlaceHelper.place_loop_element(node_i, node_j, shape_i, shape_j, bias_x,
                                           bias_y, bias_x, bias_y, beta_angle)

        elif sec_type == "自定义线圈变截面":
            shape_i = dict_by_index_for_sec[item['sec_id']]['begin_shape'][0]
            shape_j = dict_by_index_for_sec[item['sec_id']]['end_shape'][0]
            bias_i_x = dict_by_index_for_sec[item['sec_id']]['bias_begin'][0]
            bias_i_y = dict_by_index_for_sec[item['sec_id']]['bias_begin'][1]
            bias_j_x = dict_by_index_for_sec[item['sec_id']]['bias_end'][0]
            bias_j_y = dict_by_index_for_sec[item['sec_id']]['bias_end'][1]
            PlaceHelper.place_loop_element(node_i, node_j, shape_i, shape_j, bias_i_x,
                                           bias_i_y, bias_j_x, bias_j_y, beta_angle)
        elif sec_type == "自定义线宽截面":
            shape_i = dict_by_index_for_sec[item['sec_id']]['sec_shape']
            shape_j = dict_by_index_for_sec[item['sec_id']]['sec_shape']
            bias_x = dict_by_index_for_sec[item['sec_id']]['sec_bias'][0]
            bias_y = dict_by_index_for_sec[item['sec_id']]['sec_bias'][1]
            PlaceHelper.place_line_element(node_i, node_j, shape_i, shape_j,
                                           bias_x, bias_y, bias_x, bias_y, beta_angle)
        elif sec_type == "自定义线宽变截面":
            shape_i = dict_by_index_for_sec[item['sec_id']]['begin_shape']
            shape_j = dict_by_index_for_sec[item['sec_id']]['end_shape']
            bias_i_x = dict_by_index_for_sec[item['sec_id']]['bias_begin'][0]
            bias_i_y = dict_by_index_for_sec[item['sec_id']]['bias_begin'][1]
            bias_j_x = dict_by_index_for_sec[item['sec_id']]['bias_end'][0]
            bias_j_y = dict_by_index_for_sec[item['sec_id']]['bias_end'][1]
            PlaceHelper.place_line_element(node_i, node_j, shape_i, shape_j,
                                           bias_i_x, bias_i_y, bias_j_x, bias_j_y, beta_angle)
