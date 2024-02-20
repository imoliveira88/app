import React, { useEffect, useState } from 'react'

import {
    RulesBox,
    RulesText,
} from './styles';


interface PasswordValidatorProps {
    password: string,
    confirmPassword: string,
    onIsValid: Function,
    onIsInvalid: Function
}

const PasswordValidator: React.FC<PasswordValidatorProps> = ({ password, confirmPassword, onIsValid, onIsInvalid }) => {
    const rulesArr = [
        {
            id: 1,
            title: 'Sua senha deve conter ao menos 1 letra maiúscula.',
            isValid: false
        },
        {
            id: 2,
            title: 'Sua senha deve conter ao menos 1 letra minúscula.',
            isValid: false
        },
        {
            id: 3,
            title: 'Sua senha deve conter ao menos 1 número.',
            isValid: false
        },
        {
            id: 4,
            title: 'Sua senha deve conter ao menos 1 caractere especial.',
            isValid: false
        },
        {
            id: 5,
            title: 'Sua senha deve conter ao menos 8 dígitos.',
            isValid: false
        },
        {
            id: 6,
            title: 'As senhas devem ser iguais!.',
            isValid: false
        },
    ]

    const [rules, setRules] = useState<any>(rulesArr);

    useEffect(() => {
        if (password != null && password != '' && password != undefined)
            VerifyRule(password);
    }, [password, confirmPassword])

    function VerifyRule(text: string) {
        let rules = rulesArr;
        const lowerCase = /[a-z]/g;
        const upperCase = /[A-Z]/g;
        const numbers = /\d+/g;
        const specialCaracters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        rules.forEach((item, i) => {
            if (text.length >= 8)
                rules[4].isValid = true;

            if (lowerCase.test(text))
                rules[1].isValid = true;

            if (upperCase.test(text))
                rules[0].isValid = true;

            if (numbers.test(text))
                rules[2].isValid = true;

            if (specialCaracters.test(text))
                rules[3].isValid = true;

            if (password == confirmPassword)
                rules[5].isValid = true;
        });

        checkIsAllValid(rules);
        setRules(rules)
    }

    const checkIsAllValid = (rules: any) => {
        let isAllValid = true;

        rules.map((rule: any) => {
            if (!rule.isValid)
                isAllValid = false;
        })

        if (isAllValid)
            onIsValid();
        else
            onIsInvalid();
    }


    return (
        <RulesBox>
            {password != null && password != '' && password != undefined ?
                <>
                    {
                        rules.map((item: any) => (!item.isValid ? <RulesText key={item.id}>{item.title}</RulesText> : null))
                    }
                </>
                : <></>
            }
        </RulesBox>
    )
}

export default PasswordValidator
