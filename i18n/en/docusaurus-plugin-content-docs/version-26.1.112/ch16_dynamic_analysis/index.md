---
sidebar_label: 16. Dynamic Analysis
title: 16. Structural Dynamic Analysis
slug: /ch16_dynamic_analysis
---

## 16.1 Free Vibration Characteristics **Analysis**

- Qiaotong software supports free vibration characteristics analysis using lumped mass matrix or consistent mass matrix, outputting structure frequency, period, modal participation mass, participation coefficients, and specified mode shapes. Before free vibration characteristics analysis, necessary steps such as establishing overall structural model, defining node masses or converting loads to masses should be completed. The main operation process for free vibration characteristics analysis is:

  1\) Specify to perform free vibration analysis in "Analysis > Free Vibration", specify calculation matrix and number of mode shapes.

  2\) Click "Analysis > Run Analysis" or shortcut key to perform analysis;

  3\) After successful analysis, view table results of all modes related to specified settings analysis through "Results > Period and Modes", view modal displacement graphic results of specified modes through "Modes > Mode Shapes".
- For free vibration characteristics analysis settings, see: 10.4 **Free Vibration Settings**, for result output details, see: 11.3 **Free Vibration and Buckling Analysis Results**.

## 16.2 **Response Spectrum Analysis**

The steps for performing response spectrum analysis using Qiaotong software are as follows:

- Perform response spectrum analysis settings in "Analysis > Response Spectrum Analysis". Note that the prerequisite for performing response spectrum analysis is that free vibration analysis must be performed, therefore **ensure free vibration analysis is executed**.

- Add, modify, or delete response spectrum functions in "Loads > Dynamic Loads Response Spectrum Functions".

- Add, modify, or delete response spectrum cases in "Loads > Dynamic Loads Response Spectrum Cases".

- Click calculate, after completion can view table and graphic results of reactions, deformations, beam/truss/cable and composite beam element internal forces and stresses, plate element internal forces and stresses, etc. in "Results > Response Spectrum Analysis".

## 16.3 **Dynamic Time History Analysis**

- Qiaotong software supports linear and boundary nonlinear dynamic time history analysis, outputting dynamic responses such as structural deformations, internal forces and stresses. The time history analysis setting process is:

  1. Define dynamic cases in "Loads > Dynamic Loads > Time History Load Cases";
  2. Define time history functions where loads vary with time in "Loads > Dynamic Loads > Time History Functions";
  3. If boundary nonlinear support structures need to be considered, define boundary nonlinear element property values in "Loads > Dynamic Loads > Boundary Element Properties", then add boundary nonlinear supports to structure in "Loads > Dynamic Loads > Boundary Element Links";
  4. If performing seismic analysis, set seismic load direction and coefficients in "Loads > Dynamic Loads > Ground Acceleration";
  5. If performing node load analysis, set node dynamic load direction, arrival time and coefficients in "Loads > Dynamic Loads > Node Dynamic Loads";
  6. Specify to perform time history analysis in "Analysis > Time History Analysis", select output node displacement and internal force structure groups;
- For time history analysis settings, see: 10.8 **Time History Analysis Settings**, for load settings, see: 9.4 Dynamic Loads, for table result output details, see: 11.2 **Dynamic Analysis Results**.
