import React, {Component} from 'react';
import { Container, Button, Header, Content, Body, Title, Text, View, Icon, Left, Right } from 'native-base';

class AboutUs extends Component {

    printKey() {
        console.log(process.env);
    }

    render() {
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>About Us</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Button onPress={this.printKey}><Icon name='menu' /></Button>
                    <Text>About Us</Text>
                </Content>
            </Container>
        );
    }
}

export default AboutUs;