import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
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
        this.state = {
            top: false,
            left: props.drawerOpen,
            bottom: false,
            right: false,
        };
    }

    toggleDrawer(side, open) {
        return event => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }
            this.setState({...this.state, [side]: open});
        };
    }

    fullList(side) {
        return (
            <div
                style={{width: 'auto'}}
                role="presentation"
                onClick={this.toggleDrawer(side, false)}
                onKeyDown={this.toggleDrawer(side, false)}>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
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

    sideList(side) {

        return (
            <div
                style={{width: 250}}
                role="presentation"
                onClick={this.toggleDrawer(side, false)}
                onKeyDown={this.toggleDrawer(side, false)}
            >
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
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
        console.log(this.props);
        return (
            <div>
                <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
                <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
                <Button onClick={this.toggleDrawer('top', true)}>Open Top</Button>
                <Button onClick={this.toggleDrawer('bottom', true)}>Open Bottom</Button>
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    {this.sideList('left')}
                </Drawer>
                <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
                    {this.fullList('top')}
                </Drawer>
                <Drawer anchor="bottom" open={this.state.bottom} onClose={this.toggleDrawer('bottom', false)}>
                    {this.fullList('bottom')}
                </Drawer>
                <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
                    {this.sideList('right')}
                </Drawer>
            </div>
        );
    }
}

export default Drawer02;
