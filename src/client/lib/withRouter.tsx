import React, { ComponentType } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

export interface WithRouterProps<T = ReturnType<typeof useParams>> {
    history: {
        back: () => void;
        goBack: () => void;
        location: ReturnType<typeof useLocation>;
        push: (url: string, state?: any) => void;
    }
    location: ReturnType<typeof useLocation>;
    match: {
        params: T;
        urlParams: T;
    };
    navigate: ReturnType<typeof useNavigate>;
    balance: number;
    changeBalance: (newBalance: number) => void;
}

export const withRouter = <P extends object>(Component: ComponentType<P>, paramsArray: string[]) => {
    return (props: Omit<P, keyof WithRouterProps>) => {
        const [searchParams] = useSearchParams();

        let paramsList: object = {};
        if (paramsArray) {
            paramsArray.forEach(el => {
                const result = searchParams.get(el);
                if (result) paramsList = { ...paramsList, ...{ [el]: result } };
            });
        }

        const location = useLocation();
        const match = {
            params: useParams(),
            urlParams: paramsList
        };
        const navigate = useNavigate();

        const history = {
            back: () => navigate(-1),
            goBack: () => navigate(-1),
            location,
            push: (url: string, state?: any) => navigate(url, { state }),
            replace: (url: string, state?: any) => navigate(url, {
                replace: true,
                state
            })
        };

        return (
            <Component
                history={history}
                location={location}
                match={match}
                navigate={navigate}
                {...props as P}
            />
        );
    };
};
