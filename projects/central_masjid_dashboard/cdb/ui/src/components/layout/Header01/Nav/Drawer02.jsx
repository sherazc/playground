import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

class Drawer02 extends Component {
    constructor(props) {
        super(props);
        this.drawerContent = this.createDrawerContent(props);
    }

    createDrawerContent(props) {
        return (
            <div
                style={{width: 250}}
                role="presentation"
                onClick={props.onCloseDrawer}
                onKeyDown={props.onCloseDrawer}
            >
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text} onClick={() => console.log("Selected")}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Drawer open={this.props.drawerOpen} onClose={this.props.onCloseDrawer}>
                    {this.drawerContent}
                </Drawer>
            </div>
        );
    }
}

export default Drawer02;
