# Qdat Command Flow

### Version Number

```apl 
*VERSION 
```

### Unit System (Note: Currently only supports N, M import)

```apl 
*UNIT    
```

### Creep Function

```apl 
*CREEPFCT     
;Name=Name, shrinkage coefficient
;time1, creep coefficient1...
```

### Shrinkage Function

```apl 
*SHRINKFCT     
;Name=Name, shrinkage coefficient
;time1, shrinkage strain1...
```

### Shrinkage Creep

```apl 
*TDMATERIAL     
;Material number, name, specification number (Note: 1-Highway Code 2018), humidity, cement type coefficient, shrinkage start age, fly ash mix percentage
;Material number, name, specification number (Note: 2-Highway Code 2004), humidity, cement type coefficient, shrinkage start age
;Material number, name, specification number (Note: 3-Highway Code 85), creep basic coefficient, creep calculation parameters, shrinkage speed coefficient, shrinkage ultimate value
;Material number, name, specification number (Note: 4-Railway Code 17), humidity, creep basic coefficient, creep calculation parameters, shrinkage speed coefficient, shrinkage ultimate value
;Material number, name, specification number (Note: 5-Metro Design Code), humidity, shrinkage speed coefficient, shrinkage ultimate value
;Material number, name, specification number (Note: 6-Aging Theory), creep ultimate value, creep growth speed, shrinkage speed coefficient, shrinkage ultimate value
;Material number, name, specification number (Note: 7-BS5400), humidity, cement content, water ash ratio, concrete type
;Material number, name, specification number (Note: 8-AASHTO), humidity, curing days
;Material number, name, specification number (Note: 100-User Custom), shrinkage function name, creep function name1, loading age1...
```

### Material Detailed Information

```apl 
*MAT-INFO       
;Material number, name, type (Note: 1-Concrete), specification number, database, construction coefficient, creep material number (Note: -1 means no shrinkage creep), modification (Note: YES/NO), elastic modulus, unit weight, Poisson's ratio, expansion coefficient
;Material number, name, type (Note: 2-Steel), specification number, database, construction coefficient, modification (YES/NO), elastic modulus, unit weight, Poisson's ratio, expansion coefficient
;Material number, name, type (Note: 3-Prestress/Steel Wire), specification number, database, construction coefficient (Note: includes plate thickness suffix as (t1_t2)), construction coefficient, modification (Note: YES/NO), elastic modulus, unit weight, Poisson's ratio, expansion coefficient
;Material number, name, type (Note: 4-Rebar), specification number, database, construction coefficient (default is 1), modification (YES/NO), elastic modulus, unit weight, Poisson's ratio, expansion coefficient
;Material number, name, type (Note: 5-Custom), construction coefficient, elastic modulus, unit weight, Poisson's ratio, expansion coefficient, creep material number (Note: -1 means no shrinkage creep), Fcuk
;Material number, name, type (Note: 6-Composite Material), main material name, auxiliary material name
```

### Section Detailed Information

```apl 
*SEC-INFO    
;ID=Section number, name, type (Single section, consider shear (YES/NO),(eccentricity Y relative to center of mass, eccentricity Z relative to center of mass)/(center of mass/center of geometry, alignment point)
;W,H   ;Rectangular section and general section parameters (refer to section table order)
;B,N,H,YES/NO    ;Concrete box beam overall data
;H1,H2a,H2b,B1,B1a,B1b,B2,i1,i2,B0,B3,B4,T1,T2,T3,T4,,R1,R2   ;Concrete box beam box chamber data1
;C1(a1,b1,a2,b2...),C3(a1,b1,a2,b2...),C2(a1,b1,a2,b2...),C4(a1,b1,a2,b2...)   ;Concrete box beam left box type web plate top bottom chamfer data1
;Li1/LB0/LB4/LT4 =a1,a2,a3...  ;Concrete box beam left box type list data (single data not output)
;Ri1/RB0/RB4/RT4 =a1,a2,a3...  ;Concrete box beam right box type list data (single data not output)
;topDis,botDis,B1,B2,B3,B4,H,t1,t2,tw   ;I-shaped steel beam basic data
;topDis,botDis,B1,B2,B3,B4,B5,B6,H,t1,t2,tw1,tw2   ;Box-type steel beam basic data
;Symmetry(0-Symmetry 1-Asymmetry),boxNum,type(0-General),direction(0-Left 1-Right),B1,B2,B3,B4,B5,B6,Br1,Br2,Br3,Br4,Br5,H,tf1,tf2,tw1,tw2   ;Single box multi-chamber steel beam general section
;Symmetry(0-Symmetry 1-Asymmetry),boxNum,type(1-Stiffening 1),direction(0-Left 1-Right),B1,B2,B3,B4,B5,B6,Br1,Br2,Br3,Br4,Br5,H,tf1,tf2,tw1,tw2,rh,rt,rb,rhr,rtr,rbr,rt1r,rt2r,h1r,h2r,rh3r,rb,rt1r,rt2r,rh1r,rh2r,rh3r,rbr,rt1r,rt2r   ;Single box multi-chamber steel beam stiffening 1 type section
;Symmetry(0-Symmetry 1-Asymmetry),boxNum,type(2-Stiffening 2),direction(0-Left 1-Right),B1,B2,B3,B4,B5,B6,Br1,Br2,Br3,Br4,Br5,H,tf1,tf2,tw1,tw2,rh1,rh2,rh3r,rb,rt1r,rt2r,rh1r,rh2r,rh3r,rbr,rt1r,rt2r   ;Single box multi-chamber steel beam stiffening 2 type section
;Es/Ec,Ds/Dc,Ps,Pc,Ts/Tc   ;Composite beam section material properties
;Ax,Ay,Az,Ix,Iy,Iz,Iyz,Cyp,Czm,Czp,PeriO,PeriI,CentY,CentZ,Y1,Z1,Y2,Z3,Y4,Z4,ShearY,ShearZ,Thw   ;Custom property section information
;RIB=Rib plate name,H,B/(T rib parameters are H,B,tw,tf)/(U rib parameters are H,B1,B2,T,R)   ;Steel beam plate rib data
;PLACE=Arrangement position (I-shaped steel beam 1-5, I-shaped box beam 1-8, left is 1-other according to storage class), reference point 0-1, spacing, rib name, stiffening rib position (0-2), stiffening rib name    ;Steel beam plate rib arrangement data
;MAIN=(x1,y1),(x2,y2)...  ;Custom coil section outer circle information
;SUB=(x1,y1),(x2,y2)...  ;Custom coil section inner circle information
;LINE=x1,y1,x2,y2,t...   ;Custom line width section information
;ID=Section number, name, type (Variable section, consider shear (YES/NO), eccentricity information I (refer to single section), eccentricity information J (refer to single section)
;I/J=   ;Variable section IJ end data identification line, subsequent data consistent with single section data
;M/S=   ;Custom composite section main auxiliary data identification line, subsequent data consistent with custom coil data
```

### Node Information

```apl 
*NODE   
;Node number, coordinate X, coordinate Y, coordinate Z
```

### Element Information

```apl 
*ELEMENT    
;Number, type (Note: 1-Beam 2-Truss), material number, section number, beta angle, node I, node J
;Number, type (Note: 3-Cable), material number, section number, beta angle, node I, node J, tensioning type (Note: 1-Initial tension force 2-Initial horizontal force 3-Unstressed length), tensioning value
;Number, type (Note: 4-Plate), material number, section number, beta angle, node I, node J, node K, node L, plate element type (1-Thick plate 0-Thin plate)
```

### Section Group

```apl 
*TSGROUP    
;Name, element set (Note: XtoYbyN), width direction power exponent, width direction reference point, width direction distance, height direction power exponent, height direction reference point, height direction distance
```

### Boundary Group

```apl 
*BNDRGROUP  
;Boundary group name1, boundary group name2...
```

### General Support

```apl 
*GSUPPORT       
;Node number, constraint information (Note: DxyzRxyz 0-free 1-fixed), group name
```

### Elastic Support

```apl 
*ESUPPORT   
;Node number, type (Note: 1-LINE 2-TENS 3-COMP), group name, kx, ky, kz, krx, kry, krz
;Node number, type (Note: 2-TENS 3-COMP), group name, direction (0-x 1-negative x 2-y 3-negative y 4-negative z 5-negative z), kx
```

### Elastic Link

```apl 
*ELINK      
;Type(GEN-General x), node number I, node number J, beta, boundary group name, KDx, KDy, KDz, kRx, kRy, kRz, distance ratio
;Type(RIGID-Rigid), node number I, node number J, beta, boundary group name
;Type(TENS-Compression COMP-Tension), node number I, node number J, beta, boundary group name, Kx
```

### Master Constraint

```apl 
*MSLINK     
;Master node number, slave node number, constraint information (Note: DxyzRxyz 0-free 1-fixed), group name
```

### Constraint Equation

```apl 
*EQUATION      
;Name, group name, slave node number, slave node degree of freedom, master node information (master node number 1, degree of freedom, proportion factor)
```

### General Elastic Support Type

```apl 
*GSPRTYPE    
;General elastic support name, kxx, kxy, kyy, kxz, kyz, kxrx, kyrx, kzrx, kxry, kyrx, kxry, kyrx, krz, kxrz, kyrz, krzrz
```

### General Elastic Support

```apl 
*GSPRING    
;Node set, general elastic support name, boundary group name
```

### Effective Width Factor

```apl 
*EFCFACTOR    
;ElementId, Iy coefficient[I], Iy coefficient[I], Δz[I](m), Δz[J](m), boundary group
```

### Tendon Group Name

```apl 
*TDNGROUP   
;Tendon group name1, group name2
```

### Tendon Properties

```apl 
*TDN-PROPERTY   
;Tendon property name, 0-Pre/1-Post tension, material number, pipe number (1 to 5), steel strand, steel strand area, hole diameter, friction coefficient, deviation coefficient, relaxation specification (1-Highway Code 2-Railway Code 0-Do not consider), tensioning coefficient (1-Once tension 2-Super tension), relaxation coefficient (1-General relaxation 2-Low relaxation), initial shrinkage, final shrinkage
;Tendon property name, 0-Pre/1-Post tension, material number, pipe number (1 to 5), threaded rebar, threaded rebar diameter, steel strand area, hole diameter, friction coefficient, deviation coefficient, tensioning method (1-Once tension 2-Super tension), initial shrinkage, final shrinkage
```

### Tendon Information

```apl 
*TDN-PROFILE    
;NAME=Tendon name, property name, tendon group name, number of roots, positioning method (Note: 1-Straight line 2-Polyline), tendon type (STRAIGHT/TRACK), dimension (3D/2D)
;Insert point coordinates(x,y,z), direction vector(x,y,z), rotation angle, projection (Note: YES/NO)   ;Straight line tendon
;Trajectory line structure group name, insertion point (Note: 1-I-end 2-J-end), insertion element number, direction (Note: 1-ITOJ 2-JTOI), rotation angle   ;Trajectory line type tendon
;Sample point 1(x,y,z,r), sample point 2(x,y,z,r).....    ;3D tendon and sample points are wrapped in parentheses
;Z=Sample point 1(x,z,r), sample point 2(x,z,r).....    ;2D tendon and sample points are wrapped in parentheses
;Y=Sample point 1(x,y,r), sample point 2(x,y,r).....    ;2D tendon and sample points are wrapped in parentheses
```

### Prestressed Concrete Element

```apl 
*PSELEMENT      
;Element set1, element set2....(prestressed concrete member number, XtoYbyN)
```

### Node Mass

```apl 
*NODALMASS      
;Node number, mass (Note: only supports Z direction), X direction mass moment of inertia, Y direction mass moment of inertia, Z direction mass moment of inertia
```

### Load Convert to Mass

```apl 
*LOADTOMASS     
;Load case name, coefficient
```

### Load Case

```apl 
*LOADCASE       
;Case name, case type (Construction stage load, dead load, live load, dynamic, wind load, system temperature load, gradient temperature load, long rail expansion deflection force load, derailment load, vehicle impact load, long rail break force load, user defined load)
```

### Load Group

```apl 
*LOADGROUP      
;Load group number, load group name
```

### Node Load

```apl 
*NODALLOAD     
;Node number, load case, load group, Fx, Fy, Fz, Mx, My, Mz
```

### Node Displacement

```apl 
*NODALDISP     
;Node number, load case, load group, Dx, Dy, Dz, DRx, DRy, DRz
```

### Beam Element Load

```apl 
*BEAMLOAD      
;Element number, load case, load group, load type (Note: 1-Concentrated force 2-Concentrated moment), coordinate system (Note: 1-GlobalX 2-GlobalY 3-GlobalZ 4-LocalX 5-LocalY 6-LocalZ), D (Note: relative distance), P (Note: load value), eccentricity (YES/NO), eccentricity reference point (Note: 0-Shape center 1-Eccentricity point), eccentricity direction (Note: 0-GlobalX 1-GlobalY), eccentricity distance
;Element number, load case, load group, load type (Note: 3-Distributed force 4-Distributed moment), coordinate system, D1, D2, P1, P2, eccentricity (YES/NO), eccentricity reference point (Note: 0-Shape center 1-Eccentricity point), eccentricity direction (Note: 0-GlobalX 1-GlobalY), eccentricity distance
```

### Plate Element Load

```apl 
*PLATELOAD     
;Element number, load case, load group, load type (Note: 1-Concentrated force 2-Concentrated moment), coordinate system (Note: 1-GlobalX 2-GlobalY 3-GlobalZ 4-LocalX 5-LocalY 6-LocalZ), D1, D2, P1, P2
;Element number, load case, load group, load type (Note: 5-Distributed line force 6-Distributed line moment), coordinate system, position (Note: 1-IJ 2-JK 3-KL 4-LI), P1, P2
```

### Initial Tension Force

```apl 
*INITTENSION    
;Element number, load case name, load group name, tensioning type (Note: 1-Full quantity 2-Increment), calculation method (1-External force 2-Internal force 3-Convert to cable length tension), cable stiffness participation coefficient
```

### Cable Length Load

```apl 
*CABLELENLOAD     
;ElementId, load case, load group, cable length, type
```

### Prestressed Load

```apl 
*PRESTRESS     
;Tendon name, load case, load group, tensioning method (Note: 0-Start end 1-End 2-Ends), tensioning stress
```

### Element Temperature

```apl 
*ELE-TEMP      
;ElementId, load case, load group, temperature
```

### Beam Gradient Temperature

```apl 
*BEAMGRD-TEMP      
;ElementId, load case, load group, direction (0-Transverse 1-Longitudinal), temperature difference
```

### Plate Gradient Temperature

```apl 
*PLATEGRD-TEMP      
;ElementId, load case, load group, temperature difference
```

### Index Temperature

```apl 
*INDEX-TEMP      
;ElementId, load case, load group, temperature direction (0-Transverse 1-Vertical), temperature difference, exponent  ;Currently only supports section height direction temperature loading
```

### Top Plate Temperature

```apl 
*TOPPLATE-TEMP      
;ElementId, load case, load group, temperature difference
```

### User Defined Temperature

```apl 
*USER-TEMP      
;ElementId, load case, load group, direction (Note: 1-z 2-y), temperature information 1 (reference position, height, temperature), temperature information 2 (reference position, height, temperature)....  ;Reference position (1-Top 2-Bottom)
```

### Manufacturing Deviation Load

```apl 
*DEVLOAD   
;Element number, load case, load group, manufacturing deviation parameter name
;Element number, load case, load group, I-end parameter name, J-end parameter name, L-end parameter name
```

### Settlement Group

```apl 
*SINK-GROUP     
;Settlement group name, settlement value, settlement node number
```

### Settlement Case

```apl 
*SINK-CASE      
;Case name, settlement group name set (Note: separated by comma)
```

### Concurrent Reaction

```apl 
*CCT-REACT      
;Structure group1, structure group2,...
```

### Concurrent Internal Force

```apl 
*CCT-FORCE      
;Structure group1, structure group2,...
```

### Vehicle

```apl 
*VEHICLE    
;Vehicle name, definition type (1-Standard definition 2-User definition), specification number (1-China Railway Bridge Culvert Code 2017), load type, railway live load loading length, load coefficient
;Vehicle name, definition type (1-Standard definition 2-User definition), specification number (6-Urban Rail Transit Bridge Code 2017), load type, car number
;Vehicle name, definition type (1-Standard definition 2-User definition), specification number (2-Urban Bridge Design Code 2019, 3-Highway Engineering Standard 97, 4-Highway Bridge Culvert General Code 2004, 5-Highway Bridge Culvert General Code 2015, 7-Urban Area Railway Design Code 2017), load type
;Vehicle name, definition type (2-User definition), load arrangement type name (lane load), Pk, Qk
;Vehicle name, definition type (2-User definition), load arrangement type name (train ordinary live load), distributed load, empty car load, loading length, wheel weight and spacing set (Pi,Di)
;Vehicle name, definition type (2-User definition), load arrangement type name (urban light rail live load), load P, car number, empty car load, L1, L2, L3
;Vehicle name, definition type (2-User definition), load arrangement type name (old highway crowd load), load set intensity, width
;Vehicle name, definition type (2-User definition), load arrangement type name (vehicle load), wheel weight and spacing set (Pi,Di)
;Vehicle name, definition type (2-User definition), load arrangement type name (wheel weight set), left and right wheel spacing, wheel distance from influence plane minimum distance, wheel weight and spacing set (Pi,Di)
```

### Node Longitudinal Array

```apl 
*NODE-TANDEMS   
;Node longitudinal array name, start node number, node set (XtoYbyN multiple groups separated by space)
```

### Influence Surface

```apl 
*INF-PLANE  
;Node longitudinal array name1, node longitudinal array name2...
```

### Lane

```apl 
*LANE-LINE 
;Lane name, influence surface name, longitudinal array name, eccentricity, lane width, allow rocking, driving direction (0-Forward 1-Backward)
```

### Moving Load Case

```apl 
*LIVE-CASE 
;NAME=Moving load case name, influence surface name, span, save sub-case results (YES/NO), consider hanging vehicle (YES/NO), hanging vehicle name, consider special load (YES/NO), special vehicle name
;Sub-case vehicle name1, coefficient, sub-case lane name1, sub-case lane name2...
```

### Moving Load Reduction Factor

```apl 
*LIVE-REDUCTION 
;NAME=Moving load case name, reduction type (Note: 1-Automobile), specification number (Note: 0-No Highway Code 2015 2-Highway Code 2004), longitudinal reduction coefficient (Note: -1 is specification value), impact coefficient (Note: -1 is specification value), bridge fundamental frequency
;NAME=Moving load case name, reduction type (Note: 2-Train), specification number (Note: 0-No Railway Code ZK 2-Railway Code ZKH), calculate fatigue (Note: YES/NO), fatigue loading line number, longitudinal reduction coefficient (Note: -1 is specification value), strength impact coefficient (Note: -1 is specification value), fatigue coefficient, bridge type (Note: 0-4), fill soil height, arch height, calculation length or span (Note: impact coefficient specification required)
;NAME=Moving load case name, reduction type (Note: 3-Light rail), specification number (Note: Currently only supports 0-No), longitudinal reduction coefficient (Note: -1 is specification value), strength impact coefficient (Note: -1 is specification value)
;Longitudinal reduction coefficient list n1,n2,n3,n4,n5,n6,n7,n8
```

### Response Spectrum Function

```apl 
*SPFUNC   
;NAME=Response spectrum function name, adjustment coefficient, response spectrum type (0-Non-dimensional acceleration 1-Acceleration 2-Displacement)
```

### Response Spectrum Case

```apl 
*SPLDCASE    
;NAME=Response spectrum case name, combination method (1-Modal 2-Sum), description
;X/Y/Z=Response spectrum function name, coefficient
```

### Boundary Element Properties

```apl 
*BDPROP    
;NAME=Boundary element property name, boundary type, weight or elastic stiffness, yield force, description ;1-Viscous damper 2-Support friction damper 3-Sliding friction pendulum 4-Shear force pin 5-Tuned mass damper 6-Central clamp 7-Hook 8-Seam 9-Eddy current flow
;X/Y/Z=Data1 (Installation method 0-Axial 1-Tangential), data2, data3;Data can refer to interface input and only requires data under current installation method
```

### Boundary Element Link

```apl 
*BDLINK    
;Boundary element link number, element property, node number I, node number J, beta angle, reference coordinate system (0-Element 1-Global), boundary group name
```

### Time History Function

```apl 
*THFUNC   
;NAME=Time history function name, amplification coefficient, function type (0-Non-dimensional acceleration 1-Acceleration 2-Force 3-Force moment)
```

### Time History Case

```apl 
*THCASE   
;NAME=Time history case name, type (0-Linear 1-Boundary nonlinear), analysis time, analysis time step length, minimum convergence step length, convergence tolerance limit, damping type (0-No damping 1-Single damping 2-Group damping), description
;GROUP=Boundary group1, boundary group2...   ;Only boundary nonlinear considered
;DAMPING=Period1, damping ratio1, period2, damping ratio2    ;Single damping considered
;DAMPING=Material name1, material vibration period1, material period2, material damping ratio, material name2, material vibration period1, material period2, material damping ratio...     ;Different material group damping information
```

### Time History Ground Acceleration

```apl 
*GDMOTION   
;NAME=Time history load case name
;X/Y/Z=Time history function name, coefficient, arrival time
```

### Node Dynamic Load

```apl 
*DMCLOAD   
;Node number, time history case name, time history function name, loading direction (1-X 2-Y 3-Z 4-NX 5-NY 6-NZ), coefficient, arrival time
```

### Construction Stage

```apl 
*STAGE  
;ID=Stage number, stage name, duration, post-tensioning prestress loss rate, post-tensioning beam end release calculation method (1-Deformation method 2-No stress method)
;AELEM=Activated structure group name, age period, installation method (Note: 1-Deformation method 2-No stress method 3-Wire method 4-Tangent method), self-weight stage number (Note: n-Calculate self-weight stage 1-Consider self-weight, 0-Do not consider self-weight -1-Borne by other structures)
;DELEM=Post-tensioning structure group name
;ABNDR=Activated boundary group name, 0-Pre/1-Post
;DLOAD=Activated load group name, 0-Start/1-End
```

### Load Combination

```apl 
*LOADCOMB       
;NAME=Load combination name, type (Note: 1-Superposition 2-Discrimination 3-Envelope 4-Square root sum 5-Absolute value sum 6-Permanent force others discrimination, description）
;CS/ST/SM/CB/MV/RS, load case or load combination name, coefficient,...
```

### Global Settings

```apl 
*GLB-SET   
;Solver type (Note: 0-Sparse matrix solver 1-Variable bandwidth solver), calculation settings (Note: 0-Single thread 1-User custom 2-Automatic), thread count
```

### Construction Stage Analysis

```apl 
*CS-SET  
;Consider construction stage analysis (YES/NO), calculate to final stage (YES/NO), other stage name, analysis type (Note: 0-Linear 1-Nonlinear 2-Partial nonlinear), consider creep (YES/NO), cable force tension position (Note: 0-I-end 1-J-end 2-Average cable force), consider bridge completion (YES/NO)
;Shrinkage creep type (Note: 0-Only creep 1-Only shrinkage 2-Shrinkage creep), creep load type (1-Start 2-Intermediate 3-End), enable sub-division setting (YES/NO), 10-day step count, 100-day step count, 5000-day step count, 10000-day step count
```

### Operation Stage Analysis

```apl 
*OP-SET 
;Consider operation stage analysis (YES/NO), reference stage name
;ST=Static force case1, static force case2...
;SM=Settlement case1, settlement case2...
;MV=Live load case1, live load case2...
```

### Free Vibration Analysis

```apl 
*VB-SET  
;Execute free vibration analysis (YES/NO), calculation method (Note: 0-Subspace method 4-Ritz method 5-Lanczos method), matrix type (Note: 0-Lumped mass matrix 1-Consistent mass matrix), number of modes
```

### Nonlinear Analysis

```apl 
*NON-SET  
;Nonlinear settings (Note: 1-Nonlinear 2-Partial nonlinear), calculation method (0-Modified Newton method 1-Newton method), load loading step length, maximum iteration count, displacement iteration relative precision, internal force iteration relative precision
```

### Response Spectrum Analysis

```apl 
*RS-SET   
;Mode combination method (Note: 1-SRSS 2-CQC), set according to number of mode orders (YES/NO), damping ratio...
```

### Moving Load Analysis Settings

```apl 
*LIV-SET       
;Transverse encryption spacing, longitudinal encryption spacing, live load centrifugal force coefficient, displacement tracking, internal force tracking, reaction tracking, elastic link tracking, constraint equation tracking
;Calculation type (1-Simulate damping's constraint equation 2-Displacement 3-Internal force 4-Reaction 5-Link 6-Constraint equation), calculation group type (0-All 1-Group), calculation group name1, calculation group name2...
```

### Time History Analysis Settings

```apl 
*TH-SET      
;Calculate all structure groups (YES/NO), structure group name1, structure group name2...
```

### Buckling Analysis Settings

```apl 
*BUK-SET      
;Number of modes, start construction stage number (-1 represents default selecting last construction stage), specify construction stage end force state (YES/NO), calculation method (0-Do not consider self-weight 1-Calculate as variable 2-Calculate as variable)
;VL=Variable load case name1, load case name2...
;CL=Constant load case name1, load case name2...
```
