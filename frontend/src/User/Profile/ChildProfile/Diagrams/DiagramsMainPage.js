import React from 'react';
import { Grid, Header } from 'semantic-ui-react'

import EstimateDigram from './EstimateDiagram';
import DailyReportDiagram from './DailyReportDiagram';

function DigramsMainPage(props) {

    return (
        <Grid columns={2}>
            <Grid.Row>
                <Grid.Column>
                    <DailyReportDiagram childId={props.childId} />
                </Grid.Column>

                <Grid.Column>
                    <Header style={{ fontSize: '20px', fontFamily: 'Verdana, Arial, Helvetica, sans-serif', color: '#ff5500' }} textAlign='center'>
                        Diagram based on all estimates
                    </Header>
                    <EstimateDigram />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default DigramsMainPage;