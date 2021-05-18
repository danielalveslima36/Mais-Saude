import React from 'react'
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

import { useAuth } from '../context/Authenticate';
import API from '../services/Api';

const ListVisit = () => {
    
    const { usuario } = useAuth();
    const navigation = useNavigation();

    const [visits, onChangeVisits] = useState("");

    useFocusEffect(listVisit)

    function listVisit() {
        API.get(`/familia/${usuario?.id}`).then(response => {
            onChangeVisits(response.data);
        });
    }

    return (
        <ScrollView>
        </ScrollView>
    )
}

export default ListVisit

const styles = StyleSheet.create({})
