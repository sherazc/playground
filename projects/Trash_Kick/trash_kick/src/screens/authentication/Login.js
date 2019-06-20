import React, { Component } from 'react';
import { Container, Button, Header, Content, Form, Item, Input, Label, Text, View } from 'native-base';

class Login extends Component {


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
                        <View style={{marginTop: 50}}>
                            <Button onPress={() => this.props.navigation.navigate("AppDrawer")}>
                                <Text>Login</Text>
                            </Button>
                        </View>
                        <View style={{marginTop: 50}}>
                            <Button onPress={() => this.props.navigation.navigate("ForgotPassword")}>
                                <Text>Forgot password</Text>
                            </Button>
                        </View>
                    </Form>
                </Content>
            </Container>
        );
    }
}

export default Login;