import React, { Component } from 'react';
import { Container, Button, Header, Content, Body, Title, Text, View, Icon, Left, Right } from 'native-base';

class Dashboard extends Component {

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>

                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Dashboard</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Text></Text>
                    <View style={{ marginTop: 50 }}>
                        <Button onPress={() => this.props.navigation.navigate("Login")}>
                            <Text>Logout</Text>
                        </Button>
                    </View>

                </Content>
            </Container>
        );
    }
}

export default Dashboard;