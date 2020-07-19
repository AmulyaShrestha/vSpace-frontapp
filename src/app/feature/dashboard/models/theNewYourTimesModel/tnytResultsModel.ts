import {TnytMultimediaModel} from './tnytMultimediaModel';

export interface TnytResultsModel {
  abstract: string;
  multimedia: Array<TnytMultimediaModel>;
  section: string;
  byline: string;
  published_date: string;
  url: string;
  subsection: string;
  title: string;
}
