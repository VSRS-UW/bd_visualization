# Growing Voronoi Diagram and Perlin Noise Loop
This visualization is created using the following three characteristics:
  * Propogation of cells overtime (currently out from the center of the visualization)
  * Jittered Voronoi diagram - points act as centers of Voronoi cells
  * Perlin Noise Loop - gives the outer shape of the organism, this loops build each frame, no decay

Variables and constants are set at the top of the sketch and can be changed to control elicit different visualizations:
  #### General
  * absoluteFrame : running count of what frame animation is on (not meant to be changed by user)
  * growthFrames : how many frames the visualization should grow for

  #### Voronoi
  * maxCellSpread : how far the cells should be able to spread apart
  * minCells : starting number of cells (or minimum once decay is implemented)
  * maxCells : maximum number of cells
  * spreadSpeed : how fast the cells spread apart from one another (the smaller the number the faster they spread)
  * cells : list of cell positions (not meant to be changed by user)
  * propogateProb : probability that a new cell is added to visualization

  #### Perlin Noise Loop
  * radiusDivisions : number of points used to create perlin noise loop
  * perlinVariability : how much variation there is in the perlin noise loop (larger numbers correspond with less variation, NOTE: variation builds over time)
  * startingRadius : starting radius of the perlin noise loop
  * minRadiusAddition : minimum expansion of radius each frame
  * maxRadiusAddition = maximum expansion of radius each frame
  * previousRadius : list of previous radius distances (not meant to be changed by user)


This a visualization is an animation.

