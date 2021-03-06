/*
	FileName: BodyColors.ashx.ts
	Written By: Nikita Nikolaevich Petko
	File Type: Module
	Description: https://www.sitetest4.robloxlabs.com/Asset/BodyColors.ashx, Make AssetGame redirect to this instead of www redirecting to assetgame

	All commits will be made on behalf of mfd-co to https://github.com/mfdlabs/robloxlabs.com

	***

	Copyright 2006-2021 ROBLOX

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	https://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

	***
*/

export default {
	method: 'all',
	func: async (_req, res) => {
		return res.send({
			UserId: 0,
			ProfileUserId: 158190828,
			ProfileUserName: 'NIGGERPROROCOL',
			ProfileDisplayName: 'RakNetProtocol',
			FriendsCount: 18,
			UserPrecenceType: 1,
			LastLocation: 'Website',
			UserStatus: 'RakNet is superior',
			UserStatusDate: '/Date(1613344688083)/',
			UserPlaceId: null,
			FollowersCount: 122,
			FollowingsCount: 2,
			FollowersWidgetUrl: 'https://www.roblox.com/users/158190828/friends#!/followers',
			FollowingsWidgetUrl: 'https://www.roblox.com/users/158190828/friends#!/following',
			IsVieweeBlocked: false,
			IsViewerBlocked: false,
			FriendUrl: 'https://www.roblox.com/users/158190828/friends#!/friends',
			AreFriends: false,
			IncomingFriendRequestPending: false,
			MaySendFriendInvitation: false,
			FriendRequestPending: false,
			MayFollow: false,
			IsFollowing: false,
			CanMessage: true,
			MessagesDisabled: false,
			MessageUrl: '/messages/compose?recipientId=158190828',
			CanBeFollowed: false,
			CanTrade: false,
			CanSeeFavorites: true,
			IsBlockButtonVisible: false,
			GetFollowScript: '',
			IsMoreBtnVisible: false,
			MayImpersonate: false,
			MayEdit: false,
			UpdateStatusUrl: '',
			EditStatusMaxLength: 254,
			HeadShotImage: {
				Final: true,
				Url: 'https://tr.rbxcdn.com/1438573284c2c96669d76e8ab9bb2398/150/150/AvatarHeadshot/Png',
				RetryUrl: null,
				UserId: 158190828,
				EndpointType: 'Avatar',
			},
			FavoritesUrl: 'https://www.roblox.com/users/158190828/favorites#!/places',
			AbsolutePlaceUrl: '',
			IsChatDisabledByPrivacySetting: false,
			PreviousUserNames: 'gaminmasterr\r\nFKAGamingDeOne\r\n0x6e7367',
			IsUserOnPhone: false,
			CanSeeInventory: true,
			InventoryUrl: 'https://www.roblox.com/users/158190828/inventory/',
			ProfileLangResources: {
				ActionAccept: 'Accept',
				ActionAddFriend: 'Add Friend',
				ActionBlockUser: 'Block User',
				ActionCancelBlockUser: 'Cancel',
				ActionChat: 'Chat',
				ActionClose: 'Close',
				ActionConfirmBlockUser: 'Block',
				ActionConfirmUnblockUser: 'Unblock',
				ActionFavorites: 'Favorites',
				ActionFollow: 'Follow',
				ActionGridView: 'Grid View',
				ActionImpersonateUser: 'Impersonate User',
				ActionInventory: 'Inventory',
				ActionJoinGame: 'Join Game',
				ActionMessage: 'Message',
				ActionPending: 'Pending',
				ActionSave: 'Save',
				ActionSeeAll: 'See All',
				ActionSeeLess: 'See Less',
				ActionSeeMore: 'See More',
				ActionSlideshowView: 'Slideshow View',
				ActionTrade: 'Trade',
				ActionTradeItems: 'Trade Items',
				ActionUnblockUser: 'Unblock User',
				ActionUnfollow: 'Unfollow',
				ActionUnfriend: 'Unfriend',
				ActionUpdateStatus: 'Update Status',
				DescriptionAboutSuccess: 'Successfully updated description.',
				DescriptionAboutWarning: 'Keep yourself safe, do not share personal details online.',
				DescriptionBlockUserFooter: 'When you\u0027ve blocked a user, neither of you can directly contact the other.',
				DescriptionBlockUserPrompt: 'Are you sure you want to block this user?',
				DescriptionChangeAlias: 'Only you can see this information',
				DescriptionError: 'Unable to update description, please try again later.',
				DescriptionPlaceholderStatus: 'Tell the Roblox community about what you like to make, build, and play...',
				DescriptionUnblockUserPrompt: 'Are you sure you want to unblock this user?',
				HeadingAboutTab: 'About',
				HeadingBlockUserTitle: 'Warning',
				HeadingCollections: 'Collections',
				HeadingCurrentlyWearing: 'Currently Wearing',
				HeadingFavoriteGames: 'Favorites',
				HeadingFriends: 'Friends',
				HeadingGames: 'Games',
				HeadingGameTitle: 'Games',
				HeadingGroups: 'Groups',
				HeadingPlayerAssetsBadges: 'Player Badges',
				HeadingPlayerAssetsClothing: 'Clothing',
				HeadingPlayerAssetsModels: 'Models',
				HeadingPlayerBadge: 'Player Badges',
				HeadingProfile: 'Profile',
				HeadingProfileGroups: 'Groups',
				HeadingRobloxBadge: 'Roblox Badges',
				HeadingStatistics: 'Statistics',
				LabelAbout: 'About',
				LabelAlias: 'Alias',
				LabelBlockWarningBody: 'Are you sure you want to block this user?',
				LabelBlockWarningConfirm: 'Block',
				LabelBlockWarningFooter: 'When you\u0027ve blocked a user, neither of you can directly contact the other.',
				LabelCancel: 'Cancel',
				LabelChangeAlias: 'Set Alias',
				LabelCreations: 'Creations',
				LabelFollowers: 'Followers',
				LabelFollowing: 'Following',
				LabelForumPosts: 'Forum Posts',
				LabelFriends: 'Friends',
				LabelGridView: 'Grid View',
				LabelJoinDate: 'Join Date',
				LabelLoadMore: 'Load More',
				LabelMembers: 'Members',
				LabelPastUsername: 'Past Usernames',
				LabelPastUsernames: 'Past usernames',
				LabelPlaceVisits: 'Place Visits',
				LabelPlaying: 'Playing',
				LabelRank: 'Rank',
				LabelReadMore: 'Read More',
				LabelReportAbuse: 'Report Abuse',
				LabelShowLess: 'Show Less',
				LabelSlideshowView: 'Slideshow View',
				LabelUnblockWarningBody: 'Are you sure you want to unblock this user?',
				LabelUnblockWarningConfirm: 'Unblock',
				LabelVisits: 'Visits',
				LabelWarningTitle: 'Warning',
				MessageAliasHasError: 'An error has occurred. Please try again later',
				MessageAliasIsModerated: 'Please avoid using full names or offensive language.',
				MessageChangeStatus: 'What are you up to?',
				MessageErrorBlockLimit: 'Operation failed! You may have blocked too many people.',
				MessageErrorGeneral: 'Something went wrong. Please check back in a few minutes.',
				MessageSharing: 'Sharing...',
				ResponseTooManyAttempts: 'Too Many Attempts',
				State: 0,
			},
			IsVieweePremiumOnlyUser: false,
			IsDisplayNamesEnabled: false,
			IsChinaRealNameVerified: false,
			ChinaRealNameVerifiedText: 'Real Name Verified',
			IsUserStatusDisabled: false,
		});
	},
};
