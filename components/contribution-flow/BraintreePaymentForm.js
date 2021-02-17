import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import { API_V2_CONTEXT, gqlV2 } from '../../lib/graphql/helpers';

const braintreeTokenQuery = gqlV2/** GraphQL */ `
  query BraintreeTokenQuery {
    token: paymentProviderClientToken(provider: "BRAINTREE")
  }
`;

const BraintreeContainer = styled.div.attrs({ id: 'dropin-container' })`
  font-weight: 400;
  [data-braintree-id='choose-a-way-to-pay'],
  [data-braintree-id='methods-label'] {
    display: none;
  }
`;

const setupBraintree = (token, locale, onReady) => {
  braintree.dropin.create(
    {
      authorization: token,
      container: '#dropin-container',
      card: false,
      locale,
      venmo: true,
      googlePay: {
        transactionInfo: {
          currencyCode: 'USD',
          totalPriceStatus: 'FINAL',
          totalPrice: 100,
          checkoutOption: 'COMPLETE_IMMEDIATE_PURCHASE',
        },
      },
      paypal: {
        flow: 'vault',
        commit: true,
        buttonStyle: {
          color: 'blue',
          tagline: false,
          size: 'large',
        },
      },
    },
    (err, instance) => {
      // TODO if err
      onReady(instance);
    },
  );
};

const BraintreePaymentForm = ({ onReady }) => {
  const { data } = useQuery(braintreeTokenQuery, { context: API_V2_CONTEXT });
  const intl = useIntl();

  React.useEffect(() => {
    if (data?.token) {
      setupBraintree(data.token, intl.locale, onReady);
    }
  }, [data?.token]);

  return <BraintreeContainer />;
};

BraintreePaymentForm.propTypes = {
  stepDetails: PropTypes.object,
  onReady: PropTypes.function,
};

export default BraintreePaymentForm;
