import {Widget} from './widget';
import {User} from '../../../auth/model/User';

export interface Dashboard {
  id: string;
  name: string;
  user: User;
  widgets: Array<Widget>;
}
