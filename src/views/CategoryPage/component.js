import React from 'react';
import Text from '../../components/Text';
import Loading from '../../components/Loading';
import AssetGridView from '../../components/AssetGridView';
import DocumentTitle from 'react-document-title';

export default class CategoryPage extends React.Component {

  static propTypes = {
    CategoryPageStore: React.PropTypes.object,
    AssetStore: React.PropTypes.object,
  }

  static contextTypes = {
    alt: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const categoryPageStore = this.props.CategoryPageStore;
    if (categoryPageStore.fetchState !== 'SUCCESS' && !categoryPageStore.categoryAssetIds) {
      return (<Loading />);
    }

    const assetsMap = this.props.AssetStore.assets;
    const categoryAssetIds = categoryPageStore.categoryAssetIds;
    const categoryAssets = categoryAssetIds.map(id => { return assetsMap[id]; });

    if (categoryAssets.length === 0) {
      return (
        <Text padding="base">No assets found under {categoryPageStore.category}</Text>
      );
    }

    return (
      <div>
        <DocumentTitle title={`Category - ${categoryPageStore.category}`} />
        <AssetGridView
          name={`Browsing category: ${categoryPageStore.category}`}
          assets={categoryAssets} />
      </div>
    );
  }
}
