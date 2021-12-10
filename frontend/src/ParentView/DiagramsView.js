import React from 'react';
import { Grid, Header } from 'semantic-ui-react'

import AnnualEstimateDiagram from './AnnualEstimateDiagram';
import MonthlyDailyReportDiagram from './MonthlyDailyReportDiagram';

function DiagramsView(){

    return (
        <Grid columns={2}>
            <Grid.Row>
                <Grid.Column>
                    <MonthlyDailyReportDiagram />
                </Grid.Column>

                <Grid.Column>
                    <Header style={{ fontSize: '20px', fontFamily: 'Verdana, Arial, Helvetica, sans-serif', color: '#ff5500' }} textAlign='center'>
                        Diagram based on all estimates
                    </Header>
                    <AnnualEstimateDiagram />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default DiagramsView;