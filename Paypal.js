import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import queryString from 'query-string';
import { useNavigation } from '@react-navigation/native';

export default class Paypal extends Component {
    state = {
        accessToken: null,
        approvalUrl: null,
        paymentId: null,
        webViewVisible: true,
    };

    closeWebView = () => {
        this.setState({ webViewVisible: false });
    };

    componentDidMount() {
        let currency = '1 EUR';
        currency.replace(' EUR', '');

        const dataDetail = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            transactions: [
                {
                    amount: {
                        total: '1',
                        currency: 'EUR',
                        details: {
                            subtotal: '1',
                            tax: '0',
                            shipping: '0',
                            handling_fee: '0',
                            shipping_discount: '0',
                            insurance: '0',
                        },
                    },
                    payment_options: {
                        allowed_payment_method: 'INSTANT_FUNDING_SOURCE',
                    },
                },
            ],
            redirect_urls: {
                return_url: 'https://example.com',
                cancel_url: 'https://example.com',
            },
        };

        axios
            .post(
                'https://api.sandbox.paypal.com/v1/oauth2/token',
                { grant_type: 'client_credentials' },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization:
                            'Basic QWRibG5IVklrOTk5dlZ5UldxSVpQU3RmclBHNHd4ajV3TDliQ2s1RzYwX3BBNGNUQXpHU1FFMXNPaU1zZFZ4dlRUbW5TQmpDZGxsMjNwaEE6RVB0U2tuMGlLNkNfUFZFVk1DY1RNN3o1M055Znk0OThkT2h3TEo0SEtWaWswM0R4by1PU2NLczNiM0VvdFhsb1kwLXN3bTVtbzE0S2lfX2o=',
                    },
                }
            )
            .then((response) => {
                this.setState({
                    accessToken: response.data.access_token,
                });

                axios
                    .post(
                        'https://api.sandbox.paypal.com/v1/payments/payment',
                        dataDetail,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${this.state.accessToken}`,
                            },
                        }
                    )
                    .then((response) => {
                        const { id, links } = response.data;
                        const approvalUrl = links.find((data) => data.rel == 'approval_url');

                        this.setState({
                            paymentId: id,
                            approvalUrl: approvalUrl.href,
                        });
                    })
                    .catch((err) => {
                        console.log({ ...err });
                    });
            })
            .catch((err) => {
                console.log({ ...err });
            });
    }

    _onNavigationStateChange = (webViewState) => {
        if (webViewState.url.includes('https://example.com/')) {
            this.setState({
                approvalUrl: null,
            });

            const parsedUrl = queryString.parseUrl(webViewState.url);
            const { PayerID, paymentId } = parsedUrl.query;

            axios
                .post(
                    `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
                    { payer_id: PayerID },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.state.accessToken}`,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    // Navigate to PaymentSuccessPage
                    this.props.navigation.navigate('PaymentSuccessPage');
                })
                .catch((err) => {
                    console.log({ ...err });
                });
        }
    };

    render() {
        const { navigation } = this.props;
        const { approvalUrl, webViewVisible } = this.state;
        return webViewVisible ? (
            approvalUrl ? (
                <WebView
                    style={{ height: '100%', width: '100%', marginTop: 20 }}
                    source={{ uri: approvalUrl }}
                    onNavigationStateChange={this._onNavigationStateChange}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={false}
                />
            ) : (
                <ActivityIndicator />
            )
        ) : null;
    }
}