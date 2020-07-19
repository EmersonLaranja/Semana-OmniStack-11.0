import React,{useEffect,useState} from 'react'; 
import { View,FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import logoImg from '../../assets/logo.png' //The better size between the images will be imported 
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

export default function Incidents() {
    
    const [incidents,setIncidents]=useState([]);
    const [total,setTotal]=useState(0);
    const [page,setPage]=useState(1);
    const navigation=useNavigation();
    const [loading,setLoading]=useState(false);

    function navigateToDetail(incident){
        navigation.navigate('Detail',{incident});
    }

    async function LoadIncidents(){
        if(loading){
            return;
        }

        if(total>0 && incidents.length===total){
            return;
        }

        setLoading(true);
        const response = await api.get('/incidents',{
            params:{page }
        });
        setIncidents([...incidents,...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);

    }


    useEffect(()=>{
        LoadIncidents();
    },[]);
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>
            <FlatList
                data={incidents}
                keyExtractor={incident=>String(incident.id)}
                onEndReached={LoadIncidents}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator={false}
                style={styles.IncidentList}
                renderItem={({item:incident})=>(
                    <View style={styles.incident}>

                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{
                Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'})
                .format(incident.value)}
                </Text>

                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={()=>navigateToDetail(incident)}
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041"></Feather>
                    </TouchableOpacity>
                </View>
                )}
            />
        </View>
    );
}