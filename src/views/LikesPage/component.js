import React from 'react';
import Text from '../../components/Text';
import Loading from '../../components/Loading';
import AssetGridView from '../../components/AssetGridView';
import DocumentTitle from 'react-document-title';

export default class LikesPage extends React.Component {

  static propTypes = {
    LikesPageStore: React.PropTypes.object,
    AssetStore: React.PropTypes.object,
    UserStore: React.PropTypes.object,
  }

  static contextTypes = {
    alt: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  _handleLikeChange = (asset, like) => {
    if (like) {
      this.context.alt.getActions('Asset').likeAsset(asset.id);
    } else {
      this.context.alt.getActions('Asset').unlikeAsset(asset.id);
    }
  }

  render() {
    const LikesPageStore = this.props.LikesPageStore;
    if (LikesPageStore.fetchState !== 'SUCCESS' && !LikesPageStore.likesAssetIds) {
      return (<Loading />);
    }

    const assetsMap = this.props.AssetStore.assets;
    const likesAssetIds = LikesPageStore.likesAssetIds;
    const likesAssets = likesAssetIds.map(id => { return assetsMap[id]; });

    const UserStore = this.props.UserStore;
    let name = UserStore.users[LikesPageStore.likesUserId].name;

    if (likesAssets.length === 0) {
      return (
        <Text padding="base">No assets liked by {name}</Text>
      );
    }

    return (
      <div>
        <DocumentTitle title={`Likes - ${name}`} />
        <AssetGridView
          name={`Browsing Likes: ${name}`}
          assets={likesAssets}
          onAssetLikeChange={ this._handleLikeChange } />
      </div>
    );
  }
}
