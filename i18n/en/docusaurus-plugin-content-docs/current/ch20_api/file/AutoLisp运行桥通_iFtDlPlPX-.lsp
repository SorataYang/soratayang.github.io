(defun QTAPI (body / http response)
  (setq url "http://localhost:55125/pythonForQt/")
  (setq http (vlax-create-object "Msxml2.ServerXMLHTTP"))
  (vlax-invoke-method http 'Open "POST" url :vlax-false)
  (vlax-invoke-method
    http
    'setRequestHeader
    "Content-Type"
    "Python"
  )
  (vlax-invoke-method http 'send body)
  (setq response (vlax-get-property http 'responseText))
  (vlax-release-object http)
  response
)

;; Example call to the QTAPI function
(defun c:tt ()
  (setq	command_str
	 (strcat "mdb.add_node(node_data=[1,1,2,3])"  "\r\n"		
		 "mdb.add_node(node_data=[2,2,2,3])"
	 )
  )
  (QTAPI command_str)
)

