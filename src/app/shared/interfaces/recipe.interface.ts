export interface recipe {
  _id?: string;
  pictureUrl?: string;
  moment: ('matin' | 'midi' | 'soir')[];
  name: string;
  ingredients: string[];
  insulins: {
    name: string;
    units: number;
  }[];
  infos?: string;
}
