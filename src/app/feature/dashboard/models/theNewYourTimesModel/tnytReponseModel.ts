import {TnytResultsModel} from './tnytResultsModel';

export interface TnytReponseModel {
  copyright: string;
  last_updated: string;
  num_results: number;
  results: Array<TnytResultsModel>;
  section: string;
  status: string;
}
