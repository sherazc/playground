import React, {Component} from "react";
import styles from "./CloseablePanel.module.scss"

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

class CloseablePanel extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.container}>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <div className={styles.heading}>
                            {this.props.title}
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={styles.content}>

                            {this.props.children}

                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                        <Button
                            disabled={!this.props.editMode}
                            size="small" onClick={this.props.onCancel}>
                            Cancel
                        </Button>
                        <Button
                            disabled={!this.props.editMode}
                            size="small" color="primary" onClick={this.props.onSave}>
                            Save
                        </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            </div>
        );
    }
}

export default CloseablePanel;