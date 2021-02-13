import React, {Component} from "react";
import styles from "./CloseablePanel.module.scss"

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

class CloseablePanel extends Component {

    render() {
        return (
            <div className={styles.container}>
                <Accordion defaultExpanded={this.props.defaultExpanded}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <div className={styles.heading}>
                            {this.props.title}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails className={styles.content}>

                            {this.props.children}

                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
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
                    </AccordionActions>
                </Accordion>
            </div>
        );
    }
}

export default CloseablePanel;