import React from 'react';
import DocumentTitle from 'react-document-title';

import Loading from '../../components/Loading';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Card from '../../components/Card';
import LikeButton from '../../components/LikeButton';
import LikeList from '../LikeList';

export default class AssetPage extends React.Component {

  static propTypes = {
    AssetStore: React.PropTypes.object,
    params: React.PropTypes.object,
  }

  static contextTypes = {
    alt: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  _handleLikeClick = (asset) => {
    if (asset.isLiked) {
      this.context.alt.getActions('Asset').unlikeAsset(asset.id);
    } else {
      this.context.alt.getActions('Asset').likeAsset(asset.id);
    }
  }

  renderImage(asset) {
    return (
      <Card style={{width: 'auto', display: 'inline-block', maxWidth: '80%'}}>
        <image src={`/api/assets/${asset.id}/download`} style={{width: '100%'}} />
      </Card>
    );
  }

  renderAudio(asset) {
    return (
      <audio controls>
        <source src={`/api/assets/${asset.id}/download`} type={asset.contentType} />
      </audio>
    );
  }

  render() {
    const assetStore = this.props.AssetStore;
    const assetId = this.props.params.assetId;
    const asset = assetStore.assets[assetId];
    if (!asset) {
      return (<Loading />);
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <DocumentTitle title={`Asset - ${asset.title}`} />
        <div>
          <Text size="large" padding="large" bold>
            { asset.title } ({ asset.category })
          </Text>
          <Button type="default">
            <a href={`/api/assets/${assetId}/download`} target="_blank" download={asset.title}>Download</a>
          </Button>
          <LikeButton liked={ asset.isLiked } onClick={ this._handleLikeClick.bind(null, asset) }/>
        </div>
        { asset.category === 'image' ? this.renderImage(asset) : null }
        { asset.category === 'audio' ? this.renderAudio(asset) : null }
        <LikeList assetId={ asset.id } />
      </div>
    );
  }
}
