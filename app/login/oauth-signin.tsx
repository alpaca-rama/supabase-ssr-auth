'use client';

import { Provider } from "@supabase/auth-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Button } from "@/app/_components/ui/button";
import { oAuthSignIn } from "@/app/login/actions";
import React, { useTransition } from "react";
import { useRouter } from 'next/navigation';

type OAuthProvider = {
    name: Provider,
    displayName: string,
    icon?: React.ReactElement,
};

interface OAuthButtonsProps {
    buttonText: string;
}

function OAuthButton({ provider, buttonText }: { provider: OAuthProvider, buttonText: string }) {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
            try {
                await oAuthSignIn(provider.name);
            } catch (error) {
                console.error("OAuth sign-in failed:", error);
            }
        });
    };

    const stateText = buttonText === 'Login' ? 'Logging in ' : 'Signing up ';

    return (
        <Button
            onClick={handleClick}
            variant={'outline'}
            className="flex items-center justify-center w-full mb-2"
            disabled={isPending}
        >
            {isPending ? (
                <>
                    <span className={'mr-4'}>{provider.icon}</span> {stateText} with {provider.displayName}
                </>
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
        <div>
            {oAuthProviders.map((provider) => (
                <OAuthButton
                    key={provider.name}
                    provider={provider}
                    buttonText={buttonText}
                />
            ))}
        </div>
    );
}