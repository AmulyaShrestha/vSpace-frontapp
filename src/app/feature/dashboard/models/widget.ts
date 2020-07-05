export interface Widget {
  id: string;
  name: string;
  componentName: string;
  componentType: any;
  cols: number;
  rows: number;
  y: number;
  x: number;
  title?: string;
  content?: string;
}
