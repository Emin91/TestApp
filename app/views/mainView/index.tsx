import React, { FC, useMemo, memo, useState, useEffect, useRef } from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { useCountdownTimer } from "../../hooks/useCountdownTimer";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useIsFocused } from "@react-navigation/native";
import { EventItem } from "../../components/eventItem";
import { components } from "@octokit/openapi-types";
import { Endpoints } from "@octokit/types";
import { Octokit } from "@octokit/rest";
import { getStyle } from "./styles";

interface Props {
    navigation: StackNavigationProp<any>;
}

export type eventsResponseData = Endpoints["GET /events"]["response"];
export type eventsResponse = Endpoints["GET /events"]["response"];
export type eventItem = components["schemas"]["event"];
const octokit = new Octokit({ auth: `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` });

export const MainView: FC<Props> = memo(({ navigation }: Props) => {
    const styles = useMemo(() => getStyle(), []);
    const [timer] = useState<number>(10000);
    const flatList = useRef<FlatList>(null);
    const isFocused: boolean = useIsFocused();
    const [isRefresh, setIsRefresh] = useState<boolean>(false);
    const { eventsList }: { eventsList: eventsResponse["data"] } = useAppSelector(state => state.EventsSlice);
    const { countdown, startTimer, resetTimer, pauseTimer } = useCountdownTimer({ timer, onExpire: () => { getEvents(); } });
    const { _setEventsList } = useAppDispatch();

    const getEvents = async (): Promise<void> => {
        const { data }: { data: eventsResponseData["data"] } = await octokit.request(`GET /events?per_page=25`, {
            headers: {
                "X-GitHub-Api-Version": "2022-11-28",
                "accept": "application/vnd.github+json"
            }
        });
        console.log("Getting data...");
        _setEventsList(data);
        setIsRefresh(false);
        startTimer();
    };

    const onRefresh = () => {
        setIsRefresh(true);
        resetTimer();
        getEvents();
    };

    useEffect(() => {
        getEvents();
    }, []);

    useEffect(() => {
        !isFocused ? pauseTimer() : getEvents();
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <FlatList
                    data={eventsList}
                    ref={flatList}
                    overScrollMode="never"
                    refreshing={isRefresh}
                    onRefresh={onRefresh}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={<Text style={styles.emptyState} numberOfLines={1}>Events list is empty</Text>}
                    style={{ paddingTop: 10 }}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ItemSeparatorComponent={() => <View style={styles.line} />}
                    renderItem={(({ item, index }: { item: eventItem, index: number }) => (
                        <EventItem {...{ item, index }} />
                    ))}
                />
                <TouchableOpacity activeOpacity={0.6} onPress={() => flatList?.current?.scrollToOffset({ offset: 0, animated: true })} style={styles.labelWrapper}>
                    <Text style={styles.timer} numberOfLines={1}>Refreshing after: {countdown}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate("SecondView")} style={{ ...styles.labelWrapper, bottom: 20 }}>
                    <Text numberOfLines={1} style={styles.timer}>Go to second screen</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
});
