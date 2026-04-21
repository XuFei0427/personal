import React, { useEffect, useRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .wechat-section {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  .wechat-label {
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  .wechat-qr {
    width: 200px;
    height: 280px;
    border-radius: var(--border-radius);
    border: 2px solid var(--green);
    object-fit: cover;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const data = useStaticQuery(graphql`
    query {
      wechatQr: file(relativePath: { eq: "wechat-qr.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 400
            height: 560
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const wechatImage = data.wechatQr ? getImage(data.wechatQr.childImageSharp) : null;

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">联系我</h2>

      <p>
        我目前没有在找工作，但邮箱随时开放。无论你是想聊技术、约黑客松，还是只想打个招呼，我都会尽量回复！
      </p>

      <div className="wechat-section">
        <p className="wechat-label">扫码添加微信</p>
        {wechatImage ? (
          <GatsbyImage image={wechatImage} alt="微信二维码" className="wechat-qr" />
        ) : (
          <div
            className="wechat-qr"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--light-navy)',
              color: 'var(--slate)',
              fontSize: 'var(--fz-xs)',
              fontFamily: 'var(--font-mono)',
            }}>
            请添加图片: src/images/wechat-qr.png
          </div>
        )}
      </div>
    </StyledContactSection>
  );
};

export default Contact;
