import {Provider} from "@supabase/auth-js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle, faGithub} from '@fortawesome/free-brands-svg-icons';
import {Button} from "@/app/_components/ui/button";
import {oAuthSignIn} from "@/app/login/actions";
import React from "react";

type OAuthProvider = {
    name: Provider,
    displayName: string,
    icon?: React.ReactElement,
};


export default function OAuthButtons() {
    const oAuthProviders: OAuthProvider[] = [
        {
            name: 'google',
            displayName: 'Google',
            icon: <FontAwesomeIcon icon={faGoogle} />
        },
        {
            name: 'github',
            displayName: 'GitHub',
            icon: <FontAwesomeIcon icon={faGithub} />
        },
    ]

    return (

        <>
            <form>
                {oAuthProviders.map((provider, index) => (
                    <Button
                        formAction={() => oAuthSignIn(provider.name)}
                        key={provider.name}
                        variant={'outline'}
                        className={`flex items-center justify-center w-full ${index !== oAuthProviders.length -1 ? 'mb-2' : ''}`}
                    >
                        <span className={'mr-4'}>{provider.icon}</span> Login with {provider.displayName}
                    </Button>
                ))}
            </form>
        </>
    )
}

