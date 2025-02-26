/**
 * External dependencies
 */
import { useWooBlockProps } from '@woocommerce/block-templates';
import { Link } from '@woocommerce/components';
import { getNewPath } from '@woocommerce/navigation';
import { recordEvent } from '@woocommerce/tracks';
import { useInstanceId } from '@wordpress/compose';
import { useEntityProp } from '@wordpress/core-data';
import { createElement, createInterpolateElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	// @ts-expect-error `__experimentalInputControl` does exist.
	__experimentalInputControl as InputControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { useCurrencyInputProps } from '../../../hooks/use-currency-input-props';
import { PricingBlockAttributes } from './types';
import { ProductEditorBlockEditProps } from '../../../types';

export function Edit( {
	attributes,
}: ProductEditorBlockEditProps< PricingBlockAttributes > ) {
	const blockProps = useWooBlockProps( attributes );
	const { property, label, help } = attributes;
	const [ price, setPrice ] = useEntityProp< string >(
		'postType',
		'product',
		property
	);
	const inputProps = useCurrencyInputProps( {
		value: price,
		onChange: setPrice,
	} );

	const interpolatedHelp = help
		? createInterpolateElement( help, {
				PricingTab: (
					<Link
						href={ getNewPath( { tab: 'pricing' } ) }
						onClick={ () => {
							recordEvent( 'product_pricing_help_click' );
						} }
					/>
				),
		  } )
		: null;

	const priceId = useInstanceId(
		BaseControl,
		'wp-block-woocommerce-product-pricing-field'
	) as string;

	return (
		<div { ...blockProps }>
			<BaseControl id={ priceId } help={ interpolatedHelp }>
				<InputControl
					{ ...inputProps }
					id={ priceId }
					name={ property }
					label={ label || __( 'Price', 'woocommerce' ) }
				/>
			</BaseControl>
		</div>
	);
}
