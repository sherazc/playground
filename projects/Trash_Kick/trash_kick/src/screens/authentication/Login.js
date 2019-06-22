import React, { Component } from 'react';
import { Container, Button, Header, Content, Form, Item, Input, Label, Text, View } from 'native-base';
import config from '../../environment/config'


class Login extends Component {

    printKey() {
        console.log(process.env);
        console.log(config.API_BASE_URL);
        console.log(config.GOOGLE_MAPS_API_KEY);
    }

    render() {
        return (
            <Container>
                <Header />
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input />
                        </Item>
                        <View style={{ marginTop: 50 }}>
                            <Button onPress={() => this.props.navigation.navigate("AppDrawer")}>
                                <Text>Login</Text>
                            </Button>
                        </View>
                        <View style={{ marginTop: 50 }}>
                            <Button onPress={() => this.props.navigation.navigate("ForgotPassword")}>
                                <Text>Forgot password</Text>
                            </Button>
                        </View>

                        <View style={{ marginTop: 50 }}>
                            <Button onPress={this.printKey}>
                                <Text>Print Key</Text>
                            </Button>
                        </View>
                    </Form>
                    <Text>config.API_BASE_URL = {config.API_BASE_URL}</Text>
                    <Text>config.GOOGLE_MAPS_API_KEY = {config.GOOGLE_MAPS_API_KEY}</Text>
                </Content>
            </Container>
        );
    }
}

export default Login;