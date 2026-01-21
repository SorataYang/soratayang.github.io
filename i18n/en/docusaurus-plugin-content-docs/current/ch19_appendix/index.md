---
title: 19. Appendix
slug: /ch19_appendix
---

## 19.1 Stay Cable Related Calculations

### 19.1.1 Simulation Elements

There are two types of elements in Qiaotong software that can simulate stay cables, which are truss elements and cable elements.

- For truss elements:

  Can be in tension or compression, sag effect is not considered, that is, self-weight is not included in element internal forces. Whether using linear calculation or nonlinear calculation, internal forces at I-end and J-end of truss elements are always the same.
- For cable elements:

  When using linear calculation, cable elements are tension-only rod elements with elastic modulus modified by Ernst formula, only in tension, self-weight is included in element internal forces; when using nonlinear calculation, cable elements are catenary line elements, can only be in tension, cannot be in compression, resist bending and resist torsion. Cable elements need initial parameters (unstressed cable length, horizontal tension force or J-end tension force). If initial parameters are not given, cable elements are not included in structure before tensioning. Whether cable elements use linear calculation or nonlinear calculation, cable force directions at both ends are along tangent direction.

### 19.1.2 Cable Force Tensioning

There are two stay cable force tensioning methods. One is to apply initial tension force load (external force) in construction stage, cable force tensioning value is element J-end tension force. The other is to set horizontal tension force or J-end tension force (internal force) in cable element initial parameters.

### 19.1.3 Cable Length Tensioning

There are two stay cable length tensioning methods. One is to apply cable length load in construction stage. The other is to set unstressed cable length in cable element initial parameters.

## 19.2 Construction Stage Related Calculations

The software calculates step by step in a fixed order:

1. Structure installation and self-weight calculation
2. Structure demolition element calculation
3. Prestress calculation
4. Node forced displacements
5. Node concentrated loads and element load calculation
6. Element temperature loads
7. Element manufacturing deviations
8. Cable force tensioning
9. Cable length tensioning or cable adjustment
10. Concrete shrinkage and creep effects
11. Concrete shrinkage and creep induced prestress loss calculation.
