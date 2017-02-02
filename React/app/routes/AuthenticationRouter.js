/**
 * Created by vjtc0n on 2/2/17.
 */
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'
import {hashHistory} from 'react-router';

export const UserIsAuthenticated = UserAuthWrapper({
    authSelector: state => state.profile.user,
    redirectAction: () => {
        hashHistory.replace("/login")
    },
    wrapperDisplayName: 'UserIsAuthenticated',
    predicate: user => user.userId != ''
})