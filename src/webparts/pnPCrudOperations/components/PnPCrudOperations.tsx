/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-empty-pattern */
import * as React from 'react';

//import styles from './PnPCrudOperations.module.scss';
import type { IPnPCrudOperationsProps } from './IPnPCrudOperationsProps';
//import { escape } from '@microsoft/sp-lodash-subset';

import 'bootstrap/dist/css/bootstrap.min.css'
//import GetLookUpValues from './ComponentsForCrud/GetLookUpValues';
import GetData from './ComponentsForCrud/GetData'



export default class PnPCrudOperations extends React.Component<IPnPCrudOperationsProps, {}> {
  public render(): React.ReactElement<IPnPCrudOperationsProps> {



    return (
      <>
        {/* <GetLookUpValues /> */}
        <GetData />
        <h1>Hello13</h1>
      </>

    );
  }
}
