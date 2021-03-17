type MessageExport = {
  id:number;
  type:string;
  date:string;
  from:string;
  // eslint-disable-next-line camelcase
  from_id:number;
  text:string|[];
};

type ChatExport = {
  name:string;
  type:string;
  id:number;
  messages:MessageExport[];
};
