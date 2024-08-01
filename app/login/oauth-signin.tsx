import { Provider } from "@supabase/auth-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Button } from "@/app/_components/ui/button";
import { oAuthSignIn } from "@/app/login/actions";
import React, {useState} from "react";
import { useFormStatus } from 'react-dom';

type OAuthProvider = {
    name: Provider,
    displayName: string,
    icon?: React.ReactElement,
};

interface OAuthButtonsProps {
    buttonText: string;
}

function OAuthButton({ provider, buttonText }: { provider: OAuthProvider, buttonText: string }) {
    // const { pending } = useFormStatus();
    const [pending, setPending] = useState(false); // Local state for pending

    const handleClick = async () => {
        setPending(true);
        await oAuthSignIn(provider.name);
        setPending(false);
    };

    return (
        <Button
            // formAction={() => oAuthSignIn(provider.name)}
            onClick={handleClick}
            variant={'outline'}
            className="flex items-center justify-center w-full mb-2"
            disabled={pending}
        >
            {pending ? (
                'Connecting...'
            ) : (
                <>
                    <span className={'mr-4'}>{provider.icon}</span> {buttonText} with {provider.displayName}
                </>
            )}
        </Button>
    );
}

export default function OAuthButtons({ buttonText }: OAuthButtonsProps) {
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
    ];

    return (
        <form>
            {oAuthProviders.map((provider) => (
                <OAuthButton
                    key={provider.name}
                    provider={provider}
                    buttonText={buttonText}
                />
            ))}
        </form>
    );
}