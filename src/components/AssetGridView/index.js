import React from 'react';

import GridView from '../GridView';
import AssetCard from '../AssetCard';
import Text from '../Text';

export default class AssetGridView extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    assets: React.PropTypes.array.isRequired,
  }

  renderAsset(asset, index) {
    return (
      <AssetCard asset={asset} key={index} />
    );
  }

  renderAssets(assets) {
    return assets.map((asset, index) => {
      return this.renderAsset(asset, index);
    });
  }

  renderAssetGrid(assets) {
    return (
      <GridView>
        { this.renderAssets(assets) }
      </GridView>
    );
  }

  renderType(name, assets) {
    if (!assets || assets.length === 0) {
      return null;
    }

    return (
      <div>
        <Text size="large" padding="large" bold block>
          { name }
        </Text>
        { this.renderAssetGrid(assets) }
      </div>
    );
  }


  render() {
    return this.renderType(this.props.name, this.props.assets);
  }
}
