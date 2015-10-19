import React from 'react';

import Loading from '../../components/Loading';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Card from '../../components/Card';

export default class AssetPage extends React.Component {

  static propTypes = {
    AssetStore: React.PropTypes.object,
    routeParams: React.PropTypes.object,
  }

  static contextTypes = {
    alt: React.PropTypes.object.isRequired,
    router: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
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
    const assetId = this.props.routeParams.assetId;
    const asset = assetStore.assets[assetId];
    if (!asset) {
      return (<Loading />);
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <div>
          <Text size="large" padding="large" bold>
            { asset.title } ({ asset.category })
          </Text>
          <Button type="default">
            <a href={`/api/assets/${assetId}/download`} target="_blank" download={asset.title}>Download</a>
          </Button>
        </div>
        { asset.category === 'image' ? this.renderImage(asset) : null }
        { asset.category === 'audio' ? this.renderAudio(asset) : null }
      </div>
    );
  }
}
