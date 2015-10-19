import React from 'react';
import Loading from '../../components/Loading';
import AssetGridView from '../../components/AssetGridView';

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
        <AssetGridView
          name="Newest Audio"
          assets={audioAssets} />
        <AssetGridView
          name="Newest Images"
          assets={imageAssets} />
      </div>
    );
  }
}
