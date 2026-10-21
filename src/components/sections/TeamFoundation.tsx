/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { teamMembers } from '../../data/team';
import { ASSET_MAP } from '../../data/assets';
import { Container, SectionHeader } from '../common/Container';
import { Instagram, Award } from 'lucide-react';

export const TeamFoundation: React.FC = () => {
  const activeMembers = teamMembers.filter((m) => m.enabled);

  if (activeMembers.length === 0) return null;

  return (
    <section id="team" className="py-16 md:py-24 bg-white border-t border-stone-200">
      <Container>
        <SectionHeader
          eyebrow="The Artisans"
          title="Dedicated craftspeople with decades of specialized discipline."
          subtitle="Trained internationally, our stylists and scalp therapists prioritize consultation depth over hurried execution."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {activeMembers.map((member) => {
            const asset = member.imageSlot ? ASSET_MAP[member.imageSlot] : null;

            return (
              <div
                key={member.id}
                className="group flex flex-col bg-[#FAF8F5] border border-stone-200 overflow-hidden rounded-2xl shadow-sm hover:shadow-md hover:border-[#C5A46A]/60 transition-all duration-300"
              >
                {/* Portrait Photo Container */}
                <div className="relative aspect-4/5 w-full overflow-hidden bg-stone-100">
                  {asset && (
                    <img
                      src={asset.url}
                      alt={asset.alt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Experience Tag */}
                  {member.experienceYears && (
                    <div className="absolute top-4 right-4 bg-white/95 border border-stone-200 px-3 py-1 flex items-center gap-1.5 text-[11px] font-semibold text-[#9A7B38] rounded-full shadow-xs backdrop-blur-xs">
                      <Award className="w-3.5 h-3.5" />
                      <span>{member.experienceYears} Years Atelier Craft</span>
                    </div>
                  )}
                </div>

                {/* Member Info */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#9A7B38] font-bold block">
                      {member.role}
                    </span>
                    <h3 className="font-serif text-2xl text-[#18181B] mt-1">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#9A7B38] mt-1 font-semibold">
                      Specialty: {member.specialty}
                    </p>
                    <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  {member.instagramHandle && (
                    <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                      <span className="font-mono text-stone-800">{member.instagramHandle}</span>
                      <Instagram className="w-3.5 h-3.5 text-[#9A7B38]" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
