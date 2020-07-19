/*
*  Add the API key mentioned in environments variables of the application after each enum
* */
export enum TheNewYorkTimesAPILinks {
  TNYT_TOPSTORIES_ARTS = 'https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=',
  TNYT_TOPSTORIES_HOME = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=',
  TNYT_TOPSTORIES_SCIENCE = 'https://api.nytimes.com/svc/topstories/v2/science.json?api-key=',
  TNYT_TOPSTORIES_US = 'https://api.nytimes.com/svc/topstories/v2/us.json?api-key=',
  TNYT_TOPSTORIES_WORLD = 'https://api.nytimes.com/svc/topstories/v2/world.json?api-key='
}
