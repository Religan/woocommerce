/**
 * External dependencies
 */
import { Link } from '@woocommerce/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ThemeCard as TypeThemeCard } from './types';
import { ColorPalettes } from './color-palettes';

export const ThemeCard = ( {
	slug,
	description,
	thumbnail_url,
	name,
	color_palettes = [],
	link_url = '',
	is_active = false,
}: TypeThemeCard ) => {
	return (
		<div className="theme-card" key={ slug }>
			<div>
				{ link_url ? (
					<Link href={ link_url }>
						<img src={ thumbnail_url } alt={ description } />
					</Link>
				) : (
					<img src={ thumbnail_url } alt={ description } />
				) }
			</div>
			<div className="theme-card__info">
				<h2 className="theme-card__title">{ name }</h2>
				{ color_palettes && (
					<ColorPalettes colorPalettes={ color_palettes } />
				) }
			</div>
			<div>
				{ is_active && (
					<span className="theme-card__active">
						{ __( 'Active theme', 'woocommerce' ) }
					</span>
				) }
				<span className="theme-card__free">Free</span>
			</div>
		</div>
	);
};
