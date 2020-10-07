import React from 'react';
import { Button, SafeAreaView, Text} from "react-native";
import { LoadingStatus } from '../types/types';
import { useTypedDispatch } from '../store/rootReducer';

interface Props {
}

export const RecoveringFromStorage: React.FC<Props> = () => {

    const dispatch = useTypedDispatch();

    const onComplete = () => {
        dispatch({
            type: "RECOVER_INIT_STATE_SET",
            payload: {recoverInitState: LoadingStatus.COMPLETE}
        });
    }

    return (
        <SafeAreaView>
            <Text>Loading...</Text>
            <Button title="Complete (Delete it)" onPress={onComplete} />
        </SafeAreaView>
    );
}