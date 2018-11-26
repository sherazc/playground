export const loginMapStateToProps = state => {
    return {
        successful: state.login.successful,
        token: state.login.token,
        company: state.login.company,
        user: state.login.user
    }
};