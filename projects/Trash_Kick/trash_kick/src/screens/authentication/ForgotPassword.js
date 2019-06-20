import React, {Component} from 'react';
import { Container, Button, Header, Content, Body, Title, Text, View } from 'native-base';

class ForgotPassword extends Component {

    render() {
        return(
            <Container>
                <Header>
                <Body>
                    <Title>ForgotPassword</Title>
                </Body>
                </Header>
                <Content>
                    <Text></Text>
                        <View style={{marginTop: 50}}>
                            <Button onPress={() => this.props.navigation.goBack()}>
                                <Text>Back</Text>
                            </Button>
                        </View>

                </Content>
            </Container>
        );
    }
}

export default ForgotPassword;