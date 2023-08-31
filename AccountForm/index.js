import React, { useState } from "react";
import * as Animatable from 'react-native-animatable';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigation } from "@react-navigation/native";
import {
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

export function AccountForm() {
    const navigation = useNavigation();

    //tratamento de erros
    const schema = yup.object({
        name: yup.string().required("Preencha todos os campos"),
        email: yup.string().email("Email invalido").required("Preencha todos os campos"),
        password: yup.string().min(6, "Sua senha deve contar no minimo 6 caracteres").required("Digite uma senha"),
        confirmPass: yup.string().oneOf([yup.ref('password'), null], "As senhas não coincidem")
    })

    const { control, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    })

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleNewAccount() {
        //adicionar dados ao banco, ao back-end ou firebase
        setIsLoading(true);
    }

    function handleLogin() {
        //ir para tela de login, reset para evita volta a tela de registro
        navigation.reset({ routes: [{name: 'HomeScreen'}]})
    }

    return (
        <Animatable.View animation="fadeInUp" style={styles.containerForm}>
            <Text style={styles.title}>Nome</Text>
            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value} }) => (
                    <TextInput
                    placeholder="Digite seu nome"
                    style={styles.input}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    />
                )}
            />
            {errors.name && <Text style={styles.labelError}>{errors.name?.message}</Text>}

            <Text style={styles.title}>Email</Text>
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value} }) => (
                    <TextInput
                    placeholder="Digite seu email..."
                    style={styles.input}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    />
                )}
            />
            {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

            <Text style={styles.title}>Senha</Text>
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value} }) => (
                    <TextInput
                    placeholder="Crie uma senha"
                    style={styles.input}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry
                    />
                )}
            />
            {errors.password && <Text style={styles.labelError}>{errors.password?.message}</Text>}
                
            <Controller
                control={control}
                name="confirmPass"
                render={({ field: { onChange, onBlur, value} }) => (
                    <TextInput
                    placeholder="Digite a senha novamente"
                    style={styles.input}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry
                    />
                )}
            />
            {errors.confirmPass && <Text style={styles.labelError}>{errors.confirmPass?.message}</Text>}

            <TouchableOpacity style={styles.button} isLoading={isLoading} onPress={handleSubmit(handleNewAccount)}>
                <Text style={styles.bText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin} >
                <Text style={styles.bTextLogin}>Ja possui uma conta? </Text>
                <Text style={styles.boldText}>Faça login</Text>
            </TouchableOpacity>
        </Animatable.View>
    )
}

styles = StyleSheet.create({
    containerForm:{
        backgroundColor: '#FFF',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title:{
        fontSize: 20,
        marginTop: 25,
    },
    input:{
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 10,
        fontSize: 16,
    },
    button:{
        backgroundColor: '#8000ff',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bText:{
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonLogin:{
        marginTop: 14,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    bTextLogin:{
        color: '#a1a1a1',
    },
    boldText:{
        color: '#a1a1a1',
        fontWeight: 'bold',
    },
    labelError:{
        alignSelf: 'flex-end',
        color: '#ff375b',
        marginBottom: 8,
    }
})