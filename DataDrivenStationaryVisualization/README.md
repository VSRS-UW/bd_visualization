# Stationary Voronoi Diagram and Perlin Noise Loop
This visualization is created using the following three characteristics:
  * Random distribution ("Gaussian") of points - more points found near the center
  * Jittered Voronoi diagram - points act as centers of Voronoi cells
  * Perlin Noise Loop - gives the outer shape of the organism

### Variables and constants
Set at the top of the sketch and can be changed to control elicit different visualizations:

  #### General
  * **absoluteFrame** : running count of what frame animation is on (not meant to be changed by user)

  #### Voronoi
  * **numberOfCells** : number of cells in Voronoi
  * **cells** : list of cell positions (not meant to be changed by user)

  #### Perlin Noise Loop
  * **radiusDivisions** : number of points used to create perlin noise loop
  * **perlinVariability** : how much variation there is in the perlin noise loop (larger numbers correspond with less variation, **NOTE**: variation builds over time)
  * **minRadius** : minimum radius of loop
  * **maxRadius** : maximum radius of loop

**This a visualization is stationary.**
