// widgets/Favorites.js
Roblox.Favorites = (function () {
	$(function () {
		Roblox.FavoriteButton &&
			Roblox.Resources.FavoriteButton &&
			($('.favorite-button-container').attr('title', Roblox.FavoriteButton.initialTooltip),
			$('.favorite-button').click(function () {
				var n = $(this);
				$.post(n.data('toggle-url'), { assetID: n.data('assetid') }, function (t) {
					t.success &&
						(n.toggleClass('favorited'),
						n
							.closest('a')
							.attr(
								'title',
								n.hasClass('favorited')
									? Roblox.Resources.FavoriteButton.RemoveFromFavorites
									: Roblox.Resources.FavoriteButton.AddToFavorites,
							));
				});
			}));
	});
})();
