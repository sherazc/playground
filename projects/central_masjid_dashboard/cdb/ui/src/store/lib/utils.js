export const loginMapStateToProps = state => {
    return {
        successful: state.login.successful,
        token: state.login.token,
        tokenPayload: state.login.tokenPayload,
        company: state.login.company,
        user: state.login.user
    }
};