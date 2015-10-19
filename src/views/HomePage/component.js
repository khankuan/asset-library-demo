import React from 'react';
import Loading from '../../components/Loading';
import AssetGridView from '../../components/AssetGridView';
import DocumentTitle from 'react-document-title';

export default class HomePage extends React.Component {

  static propTypes = {
    HomePageStore: React.PropTypes.object,
    AssetStore: React.PropTypes.object,
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
    const homePageStore = this.props.HomePageStore;
    if (homePageStore.loading || !homePageStore.newestAssetIds) {
      return (<Loading />);
    }

    const assetsMap = this.props.AssetStore.assets;
    const newestAssetIds = homePageStore.newestAssetIds;
    const audioAssets = newestAssetIds.audio.map(id => { return assetsMap[id]; });
    const imageAssets = newestAssetIds.image.map(id => { return assetsMap[id]; });

    return (
      <div>
        <DocumentTitle title="Welcome to Asset Library" />
        <AssetGridView
          name="Newest Audio"
          assets={audioAssets}
          onAssetLikeChange={ this._handleLikeChange } />
        <AssetGridView
          name="Newest Images"
          assets={imageAssets}
          onAssetLikeChange={ this._handleLikeChange } />
      </div>
    );
  }
}
